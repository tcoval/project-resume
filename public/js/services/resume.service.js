(function() {
  'use strict';

  angular
    .module('app')
    .factory('resumeService', function ($http, $log) {
      return {
        getResumeData: function (authToken) {
          var data = {authToken: authToken};

          return $http.post('/resume', data)
            .then(function (response) {
              return response.data;
            })
            .catch(function () {
              //TODO set main template to be error and set user data to be {}
              $log.error('XHR Failed for getResumeData');
            });
        }
      };
    });
})();
