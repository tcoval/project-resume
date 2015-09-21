(function() {
  'use strict';

  angular
    .module('app', [])
    .controller('appCtrl', function ($http) {
      var vm = this;


      vm.init = function() {
        $http.get('/layout?layout=1').
          then(function(response) {
            console.log($rootElement);// response.data
          }, function(response) {
            console.log(response);
          });
      }
    });
})();
