(function() {
  'use strict';

  angular
    .module('app')
    .controller('appCtrl', function ($scope, $compile, authService, layoutService, userService) {
      var vm = this;

      vm.socket = io.connect('http://localhost:8080');
      vm.authToken = angular.element('#authToken').attr('value');

      vm.suUsername;
      vm.suPassword;
      vm.suError = '';
      vm.liUsername;
      vm.liPassword;
      vm.liError = '';

      vm.emit = emit;
      vm.getResumeData = getResumeData;
      vm.renderLayout = renderLayout;
      vm.signup = signup;
      vm.login = login;
      vm.logout = logout;

      // call to get resume data on initial load
      vm.getResumeData(vm.authToken);

      ////////////

      function emit($event) {
        var data = {
          authToken: vm.authToken,
          path: $event.target.getAttribute('data'),
          val: $event.target.innerHTML
        };

        vm.socket.emit('value-change', data);
      }

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
          });
      }

      function signup() {
        authService.signup(vm.suUsername, vm.suPassword)
          .then(function (data) {
            if (data.message) {
              vm.signupError = data.message;
            } else {
              angular.element('#authToken').attr('value', data._id);
              vm.authToken = data._id;
              vm.getResumeData(vm.authToken);
              vm.renderLayout();
              vm.suUsername = '';
              vm.suPassword = '';
              vm.suError = '';
              angular.element('#signupModal').modal('hide');
            }
          });
      }

      function login() {
        authService.login(vm.liUsername, vm.liPassword)
          .then(function (data) {
            if (data.message) {
              vm.loginError = data.message
            } else {
              angular.element('#authToken').attr('value', data.id);
              vm.authToken = data.id;
              vm.getResumeData(vm.authToken);
              vm.renderLayout();
              vm.liUsername = '';
              vm.liPassword = '';
              vm.liError = '';
              angular.element('#loginModal').modal('hide');
            }
          });
      }

      function logout() {
        authService.logout()
          .then(function () {
            // TODO: use reference to defaultUserID in util/config.js
            angular.element('#authToken').attr('value', '160445a3b997fb2d8c9d8e38');
            vm.authToken = '160445a3b997fb2d8c9d8e38';
            vm.getResumeData(vm.authToken);
            vm.renderLayout();
          });
      }
    });
})();
