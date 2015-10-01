(function() {
  'use strict';

  angular
    .module('app')
    .controller('appCtrl', function ($scope, $compile, authService, layoutService, userService) {
      var vm = this;
      var socket = io.connect('http://localhost:8080');

      vm.authToken = angular.element('#authToken').attr('value');
      vm.resume;

      vm.suUsername;
      vm.suPassword;
      vm.suError = '';
      vm.liUsername;
      vm.liPassword;
      vm.liError = '';

      vm.init = init;
      vm.emit = emit;
      vm.signup = signup;
      vm.login = login;
      vm.logout = logout;

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

      ////////////

      function init() {
        getResumeData(vm.authToken);
        renderLayout();
      }

      function emit($event) {
        var data = {
          authToken: vm.authToken,
          path: $event.target.getAttribute('data'),
          val: $event.target.innerHTML
        };

        socket.emit('value-change', data);
      }

      function signup() {
        authService.signup(vm.suUsername, vm.suPassword)
          .then(function (data) {
            if (data.message) {
              vm.suError = data.message;
            } else {
              angular.element('#authToken').attr('value', data._id);
              vm.authToken = data._id;
              getResumeData(vm.authToken);
              renderLayout();
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
              vm.liError = data.message
            } else {
              angular.element('#authToken').attr('value', data.id);
              vm.authToken = data.id;
              getResumeData(vm.authToken);
              renderLayout();
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
            getResumeData(vm.authToken);
            renderLayout();
          });
      }
    });
})();
