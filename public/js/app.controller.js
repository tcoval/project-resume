(function() {
  'use strict';

  function renderLayout($http, id) {
    id = id || 'default';
    var container = $('div.margins');
    $http.get('/template?id=' + id).
      then(function(response) {
        container.html(response.data);
      }, function(response) {
        container.html(response.data);
      });
  }

  angular
    .module('app', [])
    .controller('appCtrl', function ($element, $http) {
      var vm = this;

      vm.socket = io();

      vm.init = function() {
        renderLayout($http);
      }
    });
})();
