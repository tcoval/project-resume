(function() {
  'use strict';

  angular
    .module('app')
    .factory('userService', function ($http, $log) {
      return {
        getResumeData: function (authToken) {
          var data = {authToken: authToken || ''};

          return $http.post('/user', data)
            .then(function (response) {
              return response.data;
            })
            .catch(function () {
              $log.error('XHR Failed for getResumeData');
            });
        }
      };
    });
})();
