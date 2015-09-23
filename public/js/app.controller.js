(function() {
  'use strict';

  angular
    .module('app', [])
    .controller('appCtrl', function ($scope, $compile, layout) {
      var vm = this;
      vm.socket = io.connect('http://localhost:8080');

      vm.emit = function ($event) {
        var obj;

        // Totally janky and dependant on structure of current template
        function closestSection(el, className) {
          while (el.className !== className) {
            while (el.previousSibling !== null) {
              el = el.previousSibling;
              // console.log('previousSibling:', el)
              if (el.className === className) {
                // console.log('found!', el);
                return el.firstChild.data;
              }
            }

            el = el.parentNode;
            // console.log('parentNode:', el)
          }
        }

        obj = {
          section: closestSection($event.target, 'section-title'),
          attr: $event.target.className,
          val: $event.target.innerHTML
        };

        vm.socket.emit('value-change', obj);
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
