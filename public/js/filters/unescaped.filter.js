(function() {
  'use strict';

  angular
    .module('app')
    .filter('unescaped', function ($sce) {
      return function (val) {
        return $sce.trustAsHtml(val);
      };
    });
})();
