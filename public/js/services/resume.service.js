(function() {
  'use strict';

  angular
    .module('app')
    .factory('resumeService', resumeService);

  resumeService.$inject = ['$http', '$log'];

  function resumeService($http, $log) {
    return {
      getResumeData: getResumeData
    };

    ////////////

    function getResumeData(authToken) {
      var data = {authToken: authToken};

      return $http.post('/resume', data)
        .then(function (response) {
          return response.data;
        })
        .catch(function () {
          $log.error('XHR Failed for getResumeData');
        });
    }
  }
})();
