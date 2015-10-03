(function() {
  'use strict';

  angular
    .module('app')
    .factory('authService', function ($http, $log) {
      return {
        signup: signup,
        login: login,
        logout: logout
      };

      function signup(username, password) {
        var data = {
          username: username,
          password: password
        };

        return $http.post('/signup', data)
          .then(function successCallback(response) {
            return response.data;
          }, function errorCallback(response) {
            $log.error('XHR Failed for authService.signup');
            return response.data;
          });
      }

      function login(username, password) {
        var data = {
          username: username,
          password: password
        };

        return $http.post('/login', data)
          .then(function successCallback(response) {
            return response.data;
          }, function errorCallback(response) {
            $log.error('XHR Failed for authService.login');
            return response.data;
          });
      }

      function logout() {
        return $http.post('/logout')
          .catch(function () {
            $log.error('XHR Failed for authService.logout');
          });
      }
    });
})();
