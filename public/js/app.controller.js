(function() {
  'use strict';

  function renderLayout($http, id) {
    id = id || 'default';
    var container = $('div.margins');
    $http.get('/template?templateID=' + id).
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

      // TODO remove this (hotfix for testing user Authentication)
      $http.defaults.headers.common.authToken = '5601ec288624b693c901ca6b'

      vm.init = function() {
        renderLayout($http);
      }
    });
})();
