(function() {
  'use strict';

  angular
    .module('app', [])
    .controller('appCtrl', function (layout) {
      var vm = this;

      // vm.socket = io();

      vm.renderLayout = function () {
        var container = angular.element('div.margins');

        layout.getTemplate()
          .then(function (data) {
            container.html(data);
          });
      }
    })
    .factory('layout', function ($http, $log) {
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
