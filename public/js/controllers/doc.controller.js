(function() {
  'use strict';

  angular
    .module('app')
    .controller('docCtrl', function ($compile, $rootScope, $scope, socket) {
      var vm = this;

      vm.authToken = angular.element('#authToken').attr('value');
      vm.emit = emit;

      $rootScope.$on('compile', compile);
      $rootScope.$on('auth-token', setAuthToken);  // TODO: use reference to globally scoped authToken to avoid this

      function compile() {
        var container = angular.element('div.margins');
        $compile(container.contents())($scope);
      }

      function setAuthToken() {
        vm.authToken = angular.element('#authToken').attr('value');
      }

      //////////

      function emit($event) {
        var data = {
          authToken: vm.authToken,
          path: $event.target.getAttribute('data'),
          val: $event.target.innerHTML
        };

        socket.emit('value-change', data);
      }
    });
})();
