(function() {
  'use strict';

  angular
    .module('app')
    .factory('layoutService', function ($http, $log) {

      // TODO remove this (hotfix for testing user Authentication)
      $http.defaults.headers.common.authToken = '5601ec288624b693c901ca6b'
      
      return {
        getTemplate: function (id) {
          var id = id || 'default';

          return $http.get('/template?templateID=' + id)
            .then(function (response) {
              return response.data;
            })
            .catch(function () {
              $log.error('XHR Failed for getTemplate');
            });
        }
      };
    });
})();
