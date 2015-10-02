(function() {
  'use strict';

  angular
    .module('app')
    .controller('appCtrl', function ($compile, $rootScope, $scope, layoutService, userService) {
      var vm = this;
      vm.authToken = angular.element('#authToken').attr('value');
      vm.resume;
      vm.init = init;

      $rootScope.$on('render', init);
      $rootScope.$on('auth-token', setAuthToken);  // TODO: use reference to globally scoped authToken to avoid this

      function getResumeData(authToken) {
        userService.getResumeData(authToken)
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
            $rootScope.$broadcast('compile');
          });
      }

      function setAuthToken() {
        vm.authToken = angular.element('#authToken').attr('value');
      }

      //////////

      function init(event, authToken) {
        getResumeData(authToken);
        renderLayout();
      }
    });
})();
