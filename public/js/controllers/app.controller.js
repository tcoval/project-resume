(function() {
  'use strict';

  angular
    .module('app')
    .controller('appCtrl', function ($compile, $rootScope, $scope, authService, layoutService, userService, socket) {

      var suUsername = angular.element('#suUsername');
      socket.on('username available', function () {
        suUsername.removeClass('unavailable');
      });

      socket.on('username unavailable', function (user) {
        suUsername.addClass('unavailable');
        // vm.suSocketMsg = user.username + ' is already taken.';
      });

      var vm = this;
      vm.authToken = angular.element('#authToken').attr('value');
      vm.resume;

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
      vm.init = init;
      vm.signup = signup;
      vm.suClear = suClear;
      vm.suTooltip = suTooltip;
      vm.liClear = liClear;
      vm.login = login;
      vm.logout = logout;
      vm.validateUser = validateUser;

      /* PRIVATE FUNCTIONS */
      function getResumeData(authToken) {
        userService.getResumeData(authToken)
          .then(function (data) {
            vm.resume = data;
          });
      }

      function renderLayout() {
        var container = angular.element('div.margins');

        layoutService.getTemplate()
          .then(function (data) {
            container.html(data);
            $compile(container.contents())($scope);
            $rootScope.$broadcast('compile');
          });
      }

      /* PUBLIC FUNCTION IMPLEMENTATIONS */
      function init() {
        getResumeData(vm.authToken);
        renderLayout();
      }

      function signup() {
        authService.signup(vm.suUsername, vm.suPassword)
          .then(function (data) {
            if (data.message) {
              vm.suError = data.message;
            } else {
              angular.element('#authToken').attr('value', data._id);
              $rootScope.$broadcast('auth-token');  // TODO: remove when app.authToken is made available to child ctrls
              vm.authToken = data._id;
              getResumeData(vm.authToken);
              renderLayout();
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

      function suTooltip($event, minLength) {
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
              vm.authToken = data.id;
              getResumeData(vm.authToken);
              renderLayout();
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
            vm.authToken = '160445a3b997fb2d8c9d8e38';
            getResumeData(vm.authToken);
            renderLayout();
          });
      }

      function validateUser() {
        var data = {username: vm.suUsername};
        // vm.suSocketMsg = '';
        socket.emit('username', data);
      }
    });
})();
