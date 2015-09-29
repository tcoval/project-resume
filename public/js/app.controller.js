(function() {
  'use strict';

  angular
    .module('app')
    .controller('appCtrl', function ($scope, $compile, layoutService, userService, authService) {
      var vm = this;
      vm.socket = io.connect('http://localhost:8080');
      vm.authToken = angular.element('#authToken').attr('value');
      vm.getResumeData = getResumeData;
      vm.emit = emit;
      vm.renderLayout = renderLayout;
      vm.logIn = logIn;

      vm.getResumeData(vm.authToken);

      function getResumeData(authToken) {
        userService.getResumeData(authToken)
          .then(function (data) {
            vm.resume = data;
          });
      }

      function emit($event) {
        var data = {
          authToken: vm.authToken,
          path: $event.target.getAttribute('data'),
          val: $event.target.innerHTML
        };

        vm.socket.emit('value-change', data);
      }

      function renderLayout() {
        var container = angular.element('div.margins');

        layoutService.getTemplate()
          .then(function (data) {
            container.html(data);
            $compile(container.contents())($scope);
          });
      }

      function logIn() {
        authService.logIn(vm.username, vm.password)
          .then(function (data) {
            vm.authToken = data.id;
            angular.element('#authToken').attr('value', data.id);
            vm.getResumeData(vm.authToken);
            vm.renderLayout();
          });
      }
    });
})();
