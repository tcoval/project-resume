(function() {
  'use strict';

  angular
    .module('app')
    .controller('appCtrl', function ($compile, $rootScope, $scope, layoutService, resumeService, socket) {
      var vm = this;
      vm.authToken = '';
      vm.resume;

      vm.init = init;
      vm.emit = emit;

      $rootScope.$on('auth-token', onAuthTokenChange);

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
            // $rootScope.$broadcast('compile');
          });
      }

      function onAuthTokenChange(event, authToken) {
        vm.authToken = authToken;
        updateResumeData(authToken);
        renderLayout();
      }

      //////////

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
    });
})();
