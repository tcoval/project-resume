(function() {
  'use strict';

  angular
    .module('app')
    .directive('loginModal', function () {
      return {
        restrict: 'E',
        scope: {
          show: '='
        },
        replace: true,
        link: function (scope, element, attrs) {
          scope.hideModal = function () {
            scope.show = false;
          }
        },
        templateUrl: '../templates/login.html'
      }
    });
})();
