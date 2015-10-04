(function() {
  'use strict';

  angular
    .module('app')
    .controller('appCtrl', function ($compile, $rootScope, $scope, layoutService, resumeService) {
      var vm = this;
      vm.authToken = '';
      vm.resume;
      vm.init = init;

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
            $rootScope.$broadcast('compile');
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
    });
})();
