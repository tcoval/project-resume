(function() {
  'use strict';

  angular
    .module('app')
    .factory('authService', function ($http, $log) {
      return {
        logIn: logIn,
        logOut: logOut
      };

      function logIn(username, password) {
        var data = {
          username: username,
          password: password
        };

        return $http.post('/login', data)
          .then(function (response) {
            return response.data;
          })
          .catch(function () {
            $log.error('XHR Failed for logIn');
          });
      }

      function logOut() {
        return $http.post('/logout')
          .catch(function () {
            $log.error('XHR Failed for logOut');
          });
      }
    });
})();
