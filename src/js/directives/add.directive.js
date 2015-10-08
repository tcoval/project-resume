(function() {
  'use strict';

  angular
    .module('app')
    .directive('prAdd', prAdd);

  prAdd.$inject = ['$rootScope'];

  function prAdd($rootScope) {
    return {
      restrict: 'E',
      template: '<button type="button" class="close"><span>+</span></button>',
      link: link
    };

    function link(scope, element, attrs) {
      scope.add = function (event, sectionIndex) {
        $rootScope.$broadcast('section added', sectionIndex);
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
