(function() {
  'use strict';

  angular
    .module('app')
    .controller('loginCtrl', function () {
      var vm = this;
      vm.modalShown = false;

      vm.toggleModal = function () {
        vm.modalShown = !vm.modalShown;
      };
    });
})();
