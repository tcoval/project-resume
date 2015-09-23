(function() {
  'use strict';

  angular
    .module('app')
    .controller('appCtrl', function ($scope, $compile, layoutService) {
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

        layoutService.getTemplate()
          .then(function (data) {
            container.html(data);
            $compile(container.contents())($scope);
          });
      }
    });
})();
