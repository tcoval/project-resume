(function() {
  'use strict';

  angular
    .module('app')
    .controller('loginCtrl', function () {
      var vm = this;
      vm.visible = false;

      vm.toggleModal = function () {
        vm.visible = !vm.visible;
      };
    });
})();
