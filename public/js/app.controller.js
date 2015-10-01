(function() {
  'use strict';

  angular
    .module('app')
    .controller('appCtrl', function ($scope, $compile, layoutService, userService, authService) {
      var vm = this;
      vm.socket = io.connect('http://localhost:8080');
      vm.authToken = angular.element('#authToken').attr('value');
      vm.loginError = '';
      vm.getResumeData = getResumeData;
      vm.emit = emit;
      vm.renderLayout = renderLayout;
      vm.logIn = logIn;
      vm.logOut = logOut;
      vm.signup = signup;

      vm.getResumeData(vm.authToken);

      function getResumeData(authToken) {
        userService.getResumeData(authToken)
          .then(function (data) {
            vm.resume = data;
          });
      }

      function emit($event) {
        var data = {
          authToken: vm.authToken,
          path: $event.target.getAttribute('data'),
          val: $event.target.innerHTML
        };

        vm.socket.emit('value-change', data);
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
              vm.loginError = ''
              vm.suUsername = '';
              vm.suPassword = '';
              angular.element('#signupModal').modal('hide');
            }
          });
      }

      function logIn() {
        authService.logIn(vm.username, vm.password)
          .then(function (data) {
            if (data.message) {
              vm.loginError = data.message
            } else {
              angular.element('#authToken').attr('value', data.id);
              vm.authToken = data.id;
              vm.getResumeData(vm.authToken);
              vm.renderLayout();
              vm.loginError = ''
              vm.username = '';
              vm.password = '';
              angular.element('#loginModal').modal('hide');
            }
          });
      }

      function logOut() {
        authService.logOut()
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
