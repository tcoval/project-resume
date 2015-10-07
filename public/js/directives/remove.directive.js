(function() {
  'use strict';

  angular
    .module('app')
    .directive('prRemove', prRemove);

  prRemove.$inject = ['$rootScope'];

  function prRemove($rootScope) {
    return {
      restrict: 'E',
      template: '<button type="button" class="close"><span>×</span></button>',
      link: link
    };

    function link(scope, element, attrs) {
      scope.remove = function (event, sectionIndex) {
        $rootScope.$broadcast('section removed', sectionIndex);
      }

      element.parent().bind('mouseenter', function () {
        element.show();
      });

      element.parent().bind('mouseleave', function () {
        element.hide();
      });
    }
  }
})();
