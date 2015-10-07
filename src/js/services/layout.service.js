(function() {
  'use strict';

  angular
    .module('app')
    .factory('layoutService', layoutService);

  layoutService.$inject = ['$http', '$log'];

  function layoutService($http, $log) {
    return {
      getTemplate: getTemplate
    };

    ////////////

    function getTemplate(id) {
      var id = id || 'default';

      return $http.get('/template?templateID=' + id)
        .then(function (response) {
          return response.data;
        })
        .catch(function () {
          $log.error('XHR Failed for getTemplate');
        });
    }
  }
})();
