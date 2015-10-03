(function() {
  'use strict';

  angular
    .module('app')
    .controller('authCtrl', function ($compile, $rootScope, $scope, authService, socket) {
      var vm = this;
      var suUsername = angular.element('#suUsername');

      /* LOGIN MODAL */
      vm.liUsername;
      vm.liPassword;
      vm.liError = '';

      /* SIGNUP MODAL */
      vm.suUsername;
      vm.suPassword;
      vm.suUsernameError = '';
      vm.suError = '';

      /* PUBLIC FUNCTIONS EXPOSED TO TEMPLATES */
      vm.signup = signup;
      vm.suClear = suClear;
      vm.suTooltip = suTooltip;
      vm.liClear = liClear;
      vm.login = login;
      vm.logout = logout;
      vm.validateUser = validateUser;

      /* SOCKET.IO LISTENERS FOR SIGNUP VALIDATION */
      socket.on('username available', function () {
        suUsername.removeClass('unavailable');
      });

      socket.on('username unavailable', function (user) {
        suUsername.addClass('unavailable');
        // vm.suSocketMsg = user.username + ' is already taken.';
      });

      /* PUBLIC FUNCTION IMPLEMENTATIONS */
      function signup() {
        authService.signup(vm.suUsername, vm.suPassword)
          .then(function (data) {
            if (data.message) {
              vm.suError = data.message;
            } else {
              updateAuthToken(data.id);
              cleanupModal('#suModal');
            }
          });
      }

      function login() {
        authService.login(vm.liUsername, vm.liPassword)
          .then(function (data) {
            if (data.message) {
              vm.liError = data.message
            } else {
              updateAuthToken(data.id);
              cleanupModal('#liModal');
            }
          });
      }

      function logout() {
        authService.logout()
          .then(function () {
            angular.element('#authToken').attr('value', 'default');
            $rootScope.$broadcast('auth-token', 'default');
          });
      }

      ////////////////////////

      function updateAuthToken(authToken) {
        angular.element('#authToken').attr('value', authToken);
        $rootScope.$broadcast('auth-token', authToken);
      }

      function cleanupModal(elementID) {
        angular.element(elementID).modal('hide');
        liClear();
        suClear();
      }

      function suClear() {
        angular.element('#suPassword').tooltip('hide');
        vm.suUsername = '';
        vm.suPassword = '';
        vm.suError = '';
      }

      function liClear() {
        vm.liUsername = '';
        vm.liPassword = '';
        vm.liError = '';
      }

      function suTooltip($event) {
        // TODO: use reference to ng-minlength instead of hardcoding '6'
        if ($event.target.value.length < 6) {
          angular.element($event.target).tooltip('show');
        } else {
          angular.element($event.target).tooltip('hide');
        }
      }

      function validateUser() {
        var data = {username: vm.suUsername};
        // vm.suSocketMsg = '';
        socket.emit('username', data);
      }
    });
})();
