(function() {
  'use strict';

  angular
    .module('app')
    .controller('appCtrl', function ($scope, $compile, layoutService) {
      var vm = this;
      vm.socket = io.connect('http://localhost:8080');

      vm.emit = function ($event) {
        var data = {
          authToken: vm.authToken,
          path: $event.target.getAttribute('data'),
          val: $event.target.innerHTML
        };

        vm.socket.emit('value-change', data);
      }

      vm.renderLayout = function (authToken) {
        // authToken passed in on ng-init after signup or login
        vm.authToken = authToken || '';

        var container = angular.element('div.margins');
        layoutService.getTemplate()
          .then(function (data) {
            container.html(data);
            $compile(container.contents())($scope);
          });
      }
    });
})();
