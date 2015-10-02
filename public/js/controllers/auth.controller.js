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
      // vm.suSocketMsg = '';
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
              angular.element('#authToken').attr('value', data._id);
              $rootScope.$broadcast('auth-token');  // TODO: remove when app.authToken is made available to child ctrls
              $rootScope.$broadcast('render', data._id);
              $rootScope.$broadcast('compile');
              angular.element('#suModal').modal('hide');
              suClear();
            }
          });
      }

      function suClear() {
        angular.element('#suPassword').tooltip('hide');
        vm.suUsername = '';
        vm.suPassword = '';
        vm.suError = '';
      }

      function suTooltip($event) {
        // TODO: use reference to ng-minlength instead of hardcoding '6'
        if ($event.target.value.length < 6) {
          angular.element($event.target).tooltip('show');
        } else {
          angular.element($event.target).tooltip('hide');
        }
      }

      function liClear() {
        vm.liUsername = '';
        vm.liPassword = '';
        vm.liError = '';
      }

      function login() {
        authService.login(vm.liUsername, vm.liPassword)
          .then(function (data) {
            if (data.message) {
              vm.liError = data.message
            } else {
              angular.element('#authToken').attr('value', data.id);
              $rootScope.$broadcast('auth-token');  // TODO: remove when app.authToken is made available to child ctrls
              $rootScope.$broadcast('render', data.id);
              $rootScope.$broadcast('compile');
              angular.element('#liModal').modal('hide');
              liClear();
              suClear();
            }
          });
      }

      function logout() {
        authService.logout()
          .then(function () {
            // TODO: use reference to defaultUserID in util/config.js
            angular.element('#authToken').attr('value', '160445a3b997fb2d8c9d8e38');
            $rootScope.$broadcast('auth-token');  // TODO: remove when app.authToken is made available to child ctrls
            $rootScope.$broadcast('render', '160445a3b997fb2d8c9d8e38');
            $rootScope.$broadcast('compile');
          });
      }

      function validateUser() {
        var data = {username: vm.suUsername};
        // vm.suSocketMsg = '';
        socket.emit('username', data);
      }
    });
})();
