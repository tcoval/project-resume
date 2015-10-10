(function() {
  'use strict';

  angular
    .module('app')
    .controller('appCtrl', appCtrl);

  appCtrl.$inject = ['$compile', '$rootScope', '$scope', 'layoutService', 'resumeService', 'socket'];

  function appCtrl($compile, $rootScope, $scope, layoutService, resumeService, socket) {
    var scope = $rootScope;
    var vm = this;

    /* VIEWMODEL BINDINGS */
    vm.authToken = '';
    vm.resume;

    vm.init = init;
    vm.emit = emit;

    /* UI.SORTABLE OPTIONS */
    vm.sortableSections = {
      axis: 'y',
      tolerance: 'intersect',
      handle: '.section-handle',
      cancel: '.section-title',
      stop: function(event, ui) { // use stop because it is already wrapped with $apply
        emitSortableUpdate();
      }
    };

    // TODO: convert to angular-ui sortable when sections implementation is finished
    // $('.sortableEntries').sortable({
    //   axis: 'y',
    //   tolerance: 'intersect',
    //   handle: '.entry',
    //   update: function(event, ui) {
    //
    //   }
    // });
    //
    // $('.section-handle').hover(function() {
    //   $(this).parent().css('border-color', '#000');
    // }, function() {
    //   $(this).parent().css('border-color', 'transparent');
    // });

    /* EVENT LISTENERS (ANGULAR) */
    scope.$on('auth-token', onAuthTokenChange);
    scope.$on('section added', onSectionAdded);
    scope.$on('section removed', onSectionRemoved);

    function onAuthTokenChange(event, authToken) {
      vm.authToken = authToken;
      updateResumeData(authToken);
      renderLayout();
    }

    function onSectionAdded(event, sectionIndex) {
      var newSection = angular.extend({}, vm.resume.sections[sectionIndex]);

      vm.resume.sections.splice(sectionIndex, 0, newSection);
      emitAddSection(newSection, sectionIndex);
    }

    function onSectionRemoved(event, sectionIndex) {
      vm.resume.sections.splice(sectionIndex, 1);
      emitRemoveSection(sectionIndex);
    }

    /* PRIVATE FUNCTIONS */
    function updateResumeData(authToken) {
      resumeService.getResumeData(authToken)
        .then(function (data) {
          vm.resume = data;
        });
    }

    function renderLayout() {
      var container = angular.element('div.margins');

      layoutService.getTemplate()
        .then(function (data) {
          container.html(data);
          $compile(container.contents())($scope);
        });
    }

    function emitAddSection(newSection, sectionIndex) {
      if (vm.authToken && vm.authToken !== 'default') {
        var data = {
          authToken: vm.authToken,
          newSection: newSection,
          sectionIndex: sectionIndex
        };

        socket.emit('add-section', data);
      }
    }

    function emitRemoveSection(sectionIndex) {
      if (vm.authToken && vm.authToken !== 'default') {
        var data = {
          authToken: vm.authToken,
          sectionIndex: sectionIndex
        };

        socket.emit('remove-section', data);
      }
    }

    function emitSortableUpdate() {
      if (vm.authToken && vm.authToken !== 'default') {
        var data = {
          authToken: vm.authToken,
          sections: vm.resume.sections
        };

        socket.emit('sortable-event', data);
      }
    }

    function updateVm(data) {
      var base = vm.resume;
      var path = data.path.split('.');
      var attr = path.pop();
      var val = data.val;

      for (var i = 0, len = path.length; i < len; i++) {
        base = base[path[i]];
      }

      if (!isNaN(attr)) {
        base.set(parseInt(attr, 10), val);
      } else {
        base[attr] = val;
      }
    }

    /* PUBLIC FUNCTION IMPLEMENTATIONS */
    function init() {
      var authToken = angular.element('#authToken').attr('value');
      $rootScope.$broadcast('auth-token', authToken);
    }

    function emit($event) {
      if (vm.authToken && vm.authToken !== 'default') {
        var data = {
          authToken: vm.authToken,
          path: $event.target.getAttribute('data'),
          val: $event.target.innerHTML
        };

        updateVm(data);
        socket.emit('value-change', data);
      }
    }
  }
})();
