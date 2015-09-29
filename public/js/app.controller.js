(function() {
  'use strict';

  angular
    .module('app')
    .controller('appCtrl', function ($scope, $compile, layoutService, userService) {
      var vm = this;
      vm.socket = io.connect('http://localhost:8080');
      vm.authToken = angular.element('#authToken').attr('value');
      vm.init = init;
      vm.emit = emit;
      vm.renderLayout = renderLayout;

      vm.init();

      function init() {
        userService.getResumeData(vm.authToken)
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
    });
})();
