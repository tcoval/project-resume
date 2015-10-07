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
        emitSortableUpdate(event);
      }
    };

    /* EVENT LISTENERS (ANGULAR) */
    scope.$on('auth-token', onAuthTokenChange);

    function onAuthTokenChange(event, authToken) {
      vm.authToken = authToken;
      updateResumeData(authToken);
      renderLayout();
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

    function emitSortableUpdate(event) {
      if (vm.authToken && vm.authToken !== 'default') {
        var data = {
          authToken: vm.authToken,
          path: event.target.getAttribute('data'),
          val: eval(event.target.getAttribute('ng-model'))  // only difference compared to vm.emit...
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
