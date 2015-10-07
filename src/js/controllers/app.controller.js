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
        emitSectionUpdate(event);
      }
    };

    /* REMNANT FROM TEMPLATE-1.JS */
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
    scope.$on('section removed', onSectionRemoved);

    function onAuthTokenChange(event, authToken) {
      vm.authToken = authToken;
      updateResumeData(authToken);
      renderLayout();
    }

    function onSectionRemoved(event, sectionIndex) {
      vm.resume.sections.splice(sectionIndex, 1);
      emitSectionUpdate();
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

    // TODO: Convert to reusable function for entries, subtitles, and notes
    function emitSectionUpdate() {
      if (vm.authToken && vm.authToken !== 'default') {
        var data = {
          authToken: vm.authToken,
          path: 'sections',
          val: vm.resume.sections
        };

        socket.emit('value-change', data);
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

        socket.emit('value-change', data);
      }
    }
  }
})();
