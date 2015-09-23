(function() {
  'use strict';

  angular
    .module('app')
    .factory('layoutService', function ($http, $log) {
      return {
        getTemplate: function (id) {
          var id = id || 'default';

          return $http.get('/template?id=' + id)
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
