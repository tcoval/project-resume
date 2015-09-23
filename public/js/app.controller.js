(function() {
  'use strict';

  angular
    .module('app', [])
    .controller('appCtrl', function ($scope, $compile, layout) {
      var vm = this;
      // var socket = io();

      vm.emit = function ($event) {
        // socket.emit('update', $event.currentTarget.innerHTML);
        console.log($event.currentTarget.innerHTML);
      }

      vm.renderLayout = function () {
        var container = angular.element('div.margins');

        layout.getTemplate()
          .then(function (data) {
            container.html(data);
            $compile(container.contents())($scope);
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
