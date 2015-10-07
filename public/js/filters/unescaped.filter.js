(function() {
  'use strict';

  angular
    .module('app')
    .filter('unescaped', unescaped);

  unescaped.$inject = ['$sce'];

  function unescaped($sce) {
    return function (val) {
      return $sce.trustAsHtml(val);
    };
  }
})();
