(function() {
  'use strict';

  angular
    .module('app')
    .factory('layoutService', function ($http, $log) {

      $http.defaults.headers.common['auth-token'] = '56032fe92d82e7f12bd78b9f';

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
