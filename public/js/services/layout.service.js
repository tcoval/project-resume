(function() {
  'use strict';

  angular
    .module('app')
    .factory('layoutService', function ($http, $log) {

      $http.defaults.headers.common['auth-token'] = '560445a3b997fb2d8c9d8e83';

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
