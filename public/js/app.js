!function(){"use strict";angular.module("app",["ui.sortable"])}(),function(){"use strict";function t(t){return function(e){return t.trustAsHtml(e)}}angular.module("app").filter("unescaped",t),t.$inject=["$sce"]}(),function(){"use strict";function t(t){function e(e,n,a){e.remove=function(e,n){t.$broadcast("section removed",n)},n.parent().bind("mouseenter",function(){n.show()}),n.parent().bind("mouseleave",function(){n.hide()})}return{restrict:"E",template:'<button type="button" class="close"><span>×</span></button>',link:e}}angular.module("app").directive("prRemove",t),t.$inject=["$rootScope"]}(),function(){"use strict";function t(t,e,n,a,o,u){function r(t,e){d.authToken=e,s(e),c()}function i(t,e){d.resume.sections.splice(e,1),l()}function s(t){o.getResumeData(t).then(function(t){d.resume=t})}function c(){var e=angular.element("div.margins");a.getTemplate().then(function(a){e.html(a),t(e.contents())(n)})}function l(){if(d.authToken&&"default"!==d.authToken){var t={authToken:d.authToken,path:"sections",val:d.resume.sections};u.emit("value-change",t)}}function f(){var t=angular.element("#authToken").attr("value");e.$broadcast("auth-token",t)}function m(t){if(d.authToken&&"default"!==d.authToken){var e={authToken:d.authToken,path:t.target.getAttribute("data"),val:t.target.innerHTML};u.emit("value-change",e)}}var p=e,d=this;d.authToken="",d.resume,d.init=f,d.emit=m,d.sortableSections={axis:"y",tolerance:"intersect",handle:".section-handle",cancel:".section-title",stop:function(t,e){l(t)}},p.$on("auth-token",r),p.$on("section removed",i)}angular.module("app").controller("appCtrl",t),t.$inject=["$compile","$rootScope","$scope","layoutService","resumeService","socket"]}(),function(){"use strict";function t(t,e,n,a){function o(e){angular.element("#authToken").attr("value",e),t.$broadcast("auth-token",e)}function u(t){angular.element(t).modal("hide"),r(),i()}function r(){angular.element("#suPassword").tooltip("hide"),p.suUsername="",p.suPassword="",p.suError=""}function i(){p.liUsername="",p.liPassword="",p.liError=""}function s(){n.signup(p.suUsername,p.suPassword).then(function(t){t.message?p.suError=t.message:(o(t.id),u("#suModal"))})}function c(){n.login(p.liUsername,p.liPassword).then(function(t){t.message?p.liError=t.message:(o(t.id),u("#liModal"))})}function l(){n.logout().then(function(){angular.element("#authToken").attr("value","default"),t.$broadcast("auth-token","default")})}function f(t){t.target.value.length<6?angular.element(t.target).tooltip("show"):angular.element(t.target).tooltip("hide")}function m(){var t={username:p.suUsername};a.emit("username",t)}var p=this,d=angular.element("#suUsername");p.suUsername,p.suPassword,p.suUsernameError="",p.suError="",p.liUsername,p.liPassword,p.liError="",p.signup=s,p.login=c,p.logout=l,p.suTooltip=f,p.validateUser=m,a.on("username available",function(){d.removeClass("unavailable")}),a.on("username unavailable",function(t){d.addClass("unavailable")})}angular.module("app").controller("authCtrl",t),t.$inject=["$rootScope","$scope","authService","socket"]}(),function(){"use strict";function t(t,e){function n(n,a){var o={username:n,password:a};return t.post("/signup",o).then(function(t){return t.data},function(t){return e.error("XHR Failed for authService.signup"),t.data})}function a(n,a){var o={username:n,password:a};return t.post("/login",o).then(function(t){return t.data},function(t){return e.error("XHR Failed for authService.login"),t.data})}function o(){return t.post("/logout")["catch"](function(){e.error("XHR Failed for authService.logout")})}return{signup:n,login:a,logout:o}}angular.module("app").factory("authService",t),t.$inject=["$http","$log"]}(),function(){"use strict";function t(t,e){function n(n){var n=n||"default";return t.get("/template?templateID="+n).then(function(t){return t.data})["catch"](function(){e.error("XHR Failed for getTemplate")})}return{getTemplate:n}}angular.module("app").factory("layoutService",t),t.$inject=["$http","$log"]}(),function(){"use strict";function t(t,e){function n(n){var a={authToken:n};return t.post("/resume",a).then(function(t){return t.data})["catch"](function(){e.error("XHR Failed for getResumeData")})}return{getResumeData:n}}angular.module("app").factory("resumeService",t),t.$inject=["$http","$log"]}(),function(){"use strict";function t(t){function e(e,n){a.on(e,function(){var e=arguments;t.$apply(function(){n.apply(a,e)})})}function n(e,n,o){a.emit(e,n,function(){var e=arguments;t.$apply(function(){o&&o.apply(a,e)})})}var a=io.connect();return{on:e,emit:n}}angular.module("app").factory("socket",t),t.$inject=["$rootScope"]}();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21vZHVsZXMvYXBwLm1vZHVsZS5qcyIsImpzL2ZpbHRlcnMvdW5lc2NhcGVkLmZpbHRlci5qcyIsImpzL2RpcmVjdGl2ZXMvcmVtb3ZlLmRpcmVjdGl2ZS5qcyIsImpzL2NvbnRyb2xsZXJzL2FwcC5jb250cm9sbGVyLmpzIiwianMvY29udHJvbGxlcnMvYXV0aC5jb250cm9sbGVyLmpzIiwianMvc2VydmljZXMvYXV0aC5zZXJ2aWNlLmpzIiwianMvc2VydmljZXMvbGF5b3V0LnNlcnZpY2UuanMiLCJqcy9zZXJ2aWNlcy9yZXN1bWUuc2VydmljZS5qcyIsImpzL3NlcnZpY2VzL3NvY2tldC5zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbImFuZ3VsYXIiLCJtb2R1bGUiLCJ1bmVzY2FwZWQiLCIkc2NlIiwidmFsIiwidHJ1c3RBc0h0bWwiLCJmaWx0ZXIiLCIkaW5qZWN0IiwicHJSZW1vdmUiLCIkcm9vdFNjb3BlIiwibGluayIsInNjb3BlIiwiZWxlbWVudCIsImF0dHJzIiwicmVtb3ZlIiwiZXZlbnQiLCJzZWN0aW9uSW5kZXgiLCIkYnJvYWRjYXN0IiwicGFyZW50IiwiYmluZCIsInNob3ciLCJoaWRlIiwicmVzdHJpY3QiLCJ0ZW1wbGF0ZSIsImRpcmVjdGl2ZSIsImFwcEN0cmwiLCIkY29tcGlsZSIsIiRzY29wZSIsImxheW91dFNlcnZpY2UiLCJyZXN1bWVTZXJ2aWNlIiwic29ja2V0Iiwib25BdXRoVG9rZW5DaGFuZ2UiLCJhdXRoVG9rZW4iLCJ2bSIsInVwZGF0ZVJlc3VtZURhdGEiLCJyZW5kZXJMYXlvdXQiLCJvblNlY3Rpb25SZW1vdmVkIiwicmVzdW1lIiwic2VjdGlvbnMiLCJzcGxpY2UiLCJlbWl0U2VjdGlvblVwZGF0ZSIsImdldFJlc3VtZURhdGEiLCJ0aGVuIiwiZGF0YSIsImNvbnRhaW5lciIsImdldFRlbXBsYXRlIiwiaHRtbCIsImNvbnRlbnRzIiwicGF0aCIsImVtaXQiLCJpbml0IiwiYXR0ciIsIiRldmVudCIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsImlubmVySFRNTCIsInRoaXMiLCJzb3J0YWJsZVNlY3Rpb25zIiwiYXhpcyIsInRvbGVyYW5jZSIsImhhbmRsZSIsImNhbmNlbCIsInN0b3AiLCJ1aSIsIiRvbiIsImNvbnRyb2xsZXIiLCJhdXRoQ3RybCIsImF1dGhTZXJ2aWNlIiwidXBkYXRlQXV0aFRva2VuIiwiY2xlYW51cE1vZGFsIiwiZWxlbWVudElEIiwibW9kYWwiLCJzdUNsZWFyIiwibGlDbGVhciIsInRvb2x0aXAiLCJzdVVzZXJuYW1lIiwic3VQYXNzd29yZCIsInN1RXJyb3IiLCJsaVVzZXJuYW1lIiwibGlQYXNzd29yZCIsImxpRXJyb3IiLCJzaWdudXAiLCJtZXNzYWdlIiwiaWQiLCJsb2dpbiIsImxvZ291dCIsInN1VG9vbHRpcCIsInZhbHVlIiwibGVuZ3RoIiwidmFsaWRhdGVVc2VyIiwidXNlcm5hbWUiLCJzdVVzZXJuYW1lRXJyb3IiLCJvbiIsInJlbW92ZUNsYXNzIiwidXNlciIsImFkZENsYXNzIiwiJGh0dHAiLCIkbG9nIiwicGFzc3dvcmQiLCJwb3N0IiwicmVzcG9uc2UiLCJlcnJvciIsImZhY3RvcnkiLCJnZXQiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsImFyZ3MiLCJhcmd1bWVudHMiLCIkYXBwbHkiLCJhcHBseSIsImlvIiwiY29ubmVjdCJdLCJtYXBwaW5ncyI6IkNBQUEsV0FDQSxZQUVBQSxTQUNBQyxPQUFBLE9BQUEsbUJDSkEsV0FDQSxZQVFBLFNBQUFDLEdBQUFDLEdBQ0EsTUFBQSxVQUFBQyxHQUNBLE1BQUFELEdBQUFFLFlBQUFELElBUkFKLFFBQ0FDLE9BQUEsT0FDQUssT0FBQSxZQUFBSixHQUVBQSxFQUFBSyxTQUFBLFdDUEEsV0FDQSxZQVFBLFNBQUFDLEdBQUFDLEdBT0EsUUFBQUMsR0FBQUMsRUFBQUMsRUFBQUMsR0FDQUYsRUFBQUcsT0FBQSxTQUFBQyxFQUFBQyxHQUNBUCxFQUFBUSxXQUFBLGtCQUFBRCxJQUdBSixFQUFBTSxTQUFBQyxLQUFBLGFBQUEsV0FDQVAs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LE9BQUEsT0FDQXFHLFFBQUEsZ0JBQUF6RSxHQUVBQSxFQUFBdEIsU0FBQSxRQUFBLFdDUEEsV0FDQSxZQVFBLFNBQUF1QixHQUFBckIsR0FVQSxRQUFBbUYsR0FBQVksRUFBQUMsR0FDQTNFLEVBQUE4RCxHQUFBWSxFQUFBLFdBQ0EsR0FBQUUsR0FBQUMsU0FDQWxHLEdBQUFtRyxPQUFBLFdBQ0FILEVBQUFJLE1BQUEvRSxFQUFBNEUsT0FLQSxRQUFBekQsR0FBQXVELEVBQUE3RCxFQUFBOEQsR0FDQTNFLEVBQUFtQixLQUFBdUQsRUFBQTdELEVBQUEsV0FDQSxHQUFBK0QsR0FBQUMsU0FDQWxHLEdBQUFtRyxPQUFBLFdBQ0FILEdBQ0FBLEVBQUFJLE1BQUEvRSxFQUFBNEUsT0F2QkEsR0FBQTVFLEdBQUFnRixHQUFBQyxTQUVBLFFBQ0FuQixHQUFBQSxFQUNBM0MsS0FBQUEsR0FYQWpELFFBQ0FDLE9BQUEsT0FDQXFHLFFBQUEsU0FBQXhFLEdBRUFBLEVBQUF2QixTQUFBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhcHAnLCBbJ3VpLnNvcnRhYmxlJ10pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2FwcCcpXG4gICAgLmZpbHRlcigndW5lc2NhcGVkJywgdW5lc2NhcGVkKTtcblxuICB1bmVzY2FwZWQuJGluamVjdCA9IFsnJHNjZSddO1xuXG4gIGZ1bmN0aW9uIHVuZXNjYXBlZCgkc2NlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKHZhbCk7XG4gICAgfTtcbiAgfVxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhcHAnKVxuICAgIC5kaXJlY3RpdmUoJ3ByUmVtb3ZlJywgcHJSZW1vdmUpO1xuXG4gIHByUmVtb3ZlLiRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcblxuICBmdW5jdGlvbiBwclJlbW92ZSgkcm9vdFNjb3BlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIj48c3Bhbj7Dlzwvc3Bhbj48L2J1dHRvbj4nLFxuICAgICAgbGluazogbGlua1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgc2NvcGUucmVtb3ZlID0gZnVuY3Rpb24gKGV2ZW50LCBzZWN0aW9uSW5kZXgpIHtcbiAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdzZWN0aW9uIHJlbW92ZWQnLCBzZWN0aW9uSW5kZXgpO1xuICAgICAgfVxuXG4gICAgICBlbGVtZW50LnBhcmVudCgpLmJpbmQoJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGVsZW1lbnQuc2hvdygpO1xuICAgICAgfSk7XG5cbiAgICAgIGVsZW1lbnQucGFyZW50KCkuYmluZCgnbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZWxlbWVudC5oaWRlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignYXBwQ3RybCcsIGFwcEN0cmwpO1xuXG4gIGFwcEN0cmwuJGluamVjdCA9IFsnJGNvbXBpbGUnLCAnJHJvb3RTY29wZScsICckc2NvcGUnLCAnbGF5b3V0U2VydmljZScsICdyZXN1bWVTZXJ2aWNlJywgJ3NvY2tldCddO1xuXG4gIGZ1bmN0aW9uIGFwcEN0cmwoJGNvbXBpbGUsICRyb290U2NvcGUsICRzY29wZSwgbGF5b3V0U2VydmljZSwgcmVzdW1lU2VydmljZSwgc29ja2V0KSB7XG4gICAgdmFyIHNjb3BlID0gJHJvb3RTY29wZTtcbiAgICB2YXIgdm0gPSB0aGlzO1xuXG4gICAgLyogVklFV01PREVMIEJJTkRJTkdTICovXG4gICAgdm0uYXV0aFRva2VuID0gJyc7XG4gICAgdm0ucmVzdW1lO1xuXG4gICAgdm0uaW5pdCA9IGluaXQ7XG4gICAgdm0uZW1pdCA9IGVtaXQ7XG5cbiAgICAvKiBVSS5TT1JUQUJMRSBPUFRJT05TICovXG4gICAgdm0uc29ydGFibGVTZWN0aW9ucyA9IHtcbiAgICAgIGF4aXM6ICd5JyxcbiAgICAgIHRvbGVyYW5jZTogJ2ludGVyc2VjdCcsXG4gICAgICBoYW5kbGU6ICcuc2VjdGlvbi1oYW5kbGUnLFxuICAgICAgY2FuY2VsOiAnLnNlY3Rpb24tdGl0bGUnLFxuICAgICAgc3RvcDogZnVuY3Rpb24oZXZlbnQsIHVpKSB7IC8vIHVzZSBzdG9wIGJlY2F1c2UgaXQgaXMgYWxyZWFkeSB3cmFwcGVkIHdpdGggJGFwcGx5XG4gICAgICAgIGVtaXRTZWN0aW9uVXBkYXRlKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyogUkVNTkFOVCBGUk9NIFRFTVBMQVRFLTEuSlMgKi9cbiAgICAvLyAkKCcuc29ydGFibGVFbnRyaWVzJykuc29ydGFibGUoe1xuICAgIC8vICAgYXhpczogJ3knLFxuICAgIC8vICAgdG9sZXJhbmNlOiAnaW50ZXJzZWN0JyxcbiAgICAvLyAgIGhhbmRsZTogJy5lbnRyeScsXG4gICAgLy8gICB1cGRhdGU6IGZ1bmN0aW9uKGV2ZW50LCB1aSkge1xuICAgIC8vXG4gICAgLy8gICB9XG4gICAgLy8gfSk7XG4gICAgLy9cbiAgICAvLyAkKCcuc2VjdGlvbi1oYW5kbGUnKS5ob3ZlcihmdW5jdGlvbigpIHtcbiAgICAvLyAgICQodGhpcykucGFyZW50KCkuY3NzKCdib3JkZXItY29sb3InLCAnIzAwMCcpO1xuICAgIC8vIH0sIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgJCh0aGlzKS5wYXJlbnQoKS5jc3MoJ2JvcmRlci1jb2xvcicsICd0cmFuc3BhcmVudCcpO1xuICAgIC8vIH0pO1xuXG4gICAgLyogRVZFTlQgTElTVEVORVJTIChBTkdVTEFSKSAqL1xuICAgIHNjb3BlLiRvbignYXV0aC10b2tlbicsIG9uQXV0aFRva2VuQ2hhbmdlKTtcbiAgICBzY29wZS4kb24oJ3NlY3Rpb24gcmVtb3ZlZCcsIG9uU2VjdGlvblJlbW92ZWQpO1xuXG4gICAgZnVuY3Rpb24gb25BdXRoVG9rZW5DaGFuZ2UoZXZlbnQsIGF1dGhUb2tlbikge1xuICAgICAgdm0uYXV0aFRva2VuID0gYXV0aFRva2VuO1xuICAgICAgdXBkYXRlUmVzdW1lRGF0YShhdXRoVG9rZW4pO1xuICAgICAgcmVuZGVyTGF5b3V0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25TZWN0aW9uUmVtb3ZlZChldmVudCwgc2VjdGlvbkluZGV4KSB7XG4gICAgICB2bS5yZXN1bWUuc2VjdGlvbnMuc3BsaWNlKHNlY3Rpb25JbmRleCwgMSk7XG4gICAgICBlbWl0U2VjdGlvblVwZGF0ZSgpO1xuICAgIH1cblxuICAgIC8qIFBSSVZBVEUgRlVOQ1RJT05TICovXG4gICAgZnVuY3Rpb24gdXBkYXRlUmVzdW1lRGF0YShhdXRoVG9rZW4pIHtcbiAgICAgIHJlc3VtZVNlcnZpY2UuZ2V0UmVzdW1lRGF0YShhdXRoVG9rZW4pXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgdm0ucmVzdW1lID0gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyTGF5b3V0KCkge1xuICAgICAgdmFyIGNvbnRhaW5lciA9IGFuZ3VsYXIuZWxlbWVudCgnZGl2Lm1hcmdpbnMnKTtcblxuICAgICAgbGF5b3V0U2VydmljZS5nZXRUZW1wbGF0ZSgpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgY29udGFpbmVyLmh0bWwoZGF0YSk7XG4gICAgICAgICAgJGNvbXBpbGUoY29udGFpbmVyLmNvbnRlbnRzKCkpKCRzY29wZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFRPRE86IENvbnZlcnQgdG8gcmV1c2FibGUgZnVuY3Rpb24gZm9yIGVudHJpZXMsIHN1YnRpdGxlcywgYW5kIG5vdGVzXG4gICAgZnVuY3Rpb24gZW1pdFNlY3Rpb25VcGRhdGUoKSB7XG4gICAgICBpZiAodm0uYXV0aFRva2VuICYmIHZtLmF1dGhUb2tlbiAhPT0gJ2RlZmF1bHQnKSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIGF1dGhUb2tlbjogdm0uYXV0aFRva2VuLFxuICAgICAgICAgIHBhdGg6ICdzZWN0aW9ucycsXG4gICAgICAgICAgdmFsOiB2bS5yZXN1bWUuc2VjdGlvbnNcbiAgICAgICAgfTtcblxuICAgICAgICBzb2NrZXQuZW1pdCgndmFsdWUtY2hhbmdlJywgZGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyogUFVCTElDIEZVTkNUSU9OIElNUExFTUVOVEFUSU9OUyAqL1xuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgYXV0aFRva2VuID0gYW5ndWxhci5lbGVtZW50KCcjYXV0aFRva2VuJykuYXR0cigndmFsdWUnKTtcbiAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnYXV0aC10b2tlbicsIGF1dGhUb2tlbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW1pdCgkZXZlbnQpIHtcbiAgICAgIGlmICh2bS5hdXRoVG9rZW4gJiYgdm0uYXV0aFRva2VuICE9PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgYXV0aFRva2VuOiB2bS5hdXRoVG9rZW4sXG4gICAgICAgICAgcGF0aDogJGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEnKSxcbiAgICAgICAgICB2YWw6ICRldmVudC50YXJnZXQuaW5uZXJIVE1MXG4gICAgICAgIH07XG5cbiAgICAgICAgc29ja2V0LmVtaXQoJ3ZhbHVlLWNoYW5nZScsIGRhdGEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSkoKTtcbiIsIihmdW5jdGlvbigpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdhdXRoQ3RybCcsIGF1dGhDdHJsKTtcblxuICBhdXRoQ3RybC4kaW5qZWN0ID0gWyckcm9vdFNjb3BlJywgJyRzY29wZScsICdhdXRoU2VydmljZScsICdzb2NrZXQnXTtcblxuICBmdW5jdGlvbiBhdXRoQ3RybCgkcm9vdFNjb3BlLCAkc2NvcGUsIGF1dGhTZXJ2aWNlLCBzb2NrZXQpIHtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIHZhciBzdVVzZXJuYW1lID0gYW5ndWxhci5lbGVtZW50KCcjc3VVc2VybmFtZScpO1xuXG4gICAgLyogVklFV01PREVMIEJJTkRJTkdTICovXG4gICAgdm0uc3VVc2VybmFtZTtcbiAgICB2bS5zdVBhc3N3b3JkO1xuICAgIHZtLnN1VXNlcm5hbWVFcnJvciA9ICcnO1xuICAgIHZtLnN1RXJyb3IgPSAnJztcblxuICAgIHZtLmxpVXNlcm5hbWU7XG4gICAgdm0ubGlQYXNzd29yZDtcbiAgICB2bS5saUVycm9yID0gJyc7XG5cbiAgICB2bS5zaWdudXAgPSBzaWdudXA7XG4gICAgdm0ubG9naW4gPSBsb2dpbjtcbiAgICB2bS5sb2dvdXQgPSBsb2dvdXQ7XG4gICAgdm0uc3VUb29sdGlwID0gc3VUb29sdGlwO1xuICAgIHZtLnZhbGlkYXRlVXNlciA9IHZhbGlkYXRlVXNlcjtcblxuICAgIC8qIEVWRU5UIExJU1RFTkVSUyAoU09DS0VULklPKSAqL1xuICAgIHNvY2tldC5vbigndXNlcm5hbWUgYXZhaWxhYmxlJywgZnVuY3Rpb24gKCkge1xuICAgICAgc3VVc2VybmFtZS5yZW1vdmVDbGFzcygndW5hdmFpbGFibGUnKTtcbiAgICB9KTtcblxuICAgIHNvY2tldC5vbigndXNlcm5hbWUgdW5hdmFpbGFibGUnLCBmdW5jdGlvbiAodXNlcikge1xuICAgICAgc3VVc2VybmFtZS5hZGRDbGFzcygndW5hdmFpbGFibGUnKTtcbiAgICAgIC8vIHZtLnN1U29ja2V0TXNnID0gdXNlci51c2VybmFtZSArICcgaXMgYWxyZWFkeSB0YWtlbi4nO1xuICAgIH0pO1xuXG4gICAgLyogUFJJVkFURSBGVU5DVElPTlMgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVBdXRoVG9rZW4oYXV0aFRva2VuKSB7XG4gICAgICBhbmd1bGFyLmVsZW1lbnQoJyNhdXRoVG9rZW4nKS5hdHRyKCd2YWx1ZScsIGF1dGhUb2tlbik7XG4gICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2F1dGgtdG9rZW4nLCBhdXRoVG9rZW4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFudXBNb2RhbChlbGVtZW50SUQpIHtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudChlbGVtZW50SUQpLm1vZGFsKCdoaWRlJyk7XG4gICAgICBzdUNsZWFyKCk7XG4gICAgICBsaUNsZWFyKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3VDbGVhcigpIHtcbiAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI3N1UGFzc3dvcmQnKS50b29sdGlwKCdoaWRlJyk7XG4gICAgICB2bS5zdVVzZXJuYW1lID0gJyc7XG4gICAgICB2bS5zdVBhc3N3b3JkID0gJyc7XG4gICAgICB2bS5zdUVycm9yID0gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGlDbGVhcigpIHtcbiAgICAgIHZtLmxpVXNlcm5hbWUgPSAnJztcbiAgICAgIHZtLmxpUGFzc3dvcmQgPSAnJztcbiAgICAgIHZtLmxpRXJyb3IgPSAnJztcbiAgICB9XG5cbiAgICAvKiBQVUJMSUMgRlVOQ1RJT04gSU1QTEVNRU5UQVRJT05TICovXG4gICAgZnVuY3Rpb24gc2lnbnVwKCkge1xuICAgICAgYXV0aFNlcnZpY2Uuc2lnbnVwKHZtLnN1VXNlcm5hbWUsIHZtLnN1UGFzc3dvcmQpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgaWYgKGRhdGEubWVzc2FnZSkge1xuICAgICAgICAgICAgdm0uc3VFcnJvciA9IGRhdGEubWVzc2FnZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXBkYXRlQXV0aFRva2VuKGRhdGEuaWQpO1xuICAgICAgICAgICAgY2xlYW51cE1vZGFsKCcjc3VNb2RhbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9naW4oKSB7XG4gICAgICBhdXRoU2VydmljZS5sb2dpbih2bS5saVVzZXJuYW1lLCB2bS5saVBhc3N3b3JkKVxuICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgIGlmIChkYXRhLm1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHZtLmxpRXJyb3IgPSBkYXRhLm1lc3NhZ2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXBkYXRlQXV0aFRva2VuKGRhdGEuaWQpO1xuICAgICAgICAgICAgY2xlYW51cE1vZGFsKCcjbGlNb2RhbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nb3V0KCkge1xuICAgICAgYXV0aFNlcnZpY2UubG9nb3V0KClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGFuZ3VsYXIuZWxlbWVudCgnI2F1dGhUb2tlbicpLmF0dHIoJ3ZhbHVlJywgJ2RlZmF1bHQnKTtcbiAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2F1dGgtdG9rZW4nLCAnZGVmYXVsdCcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdVRvb2x0aXAoJGV2ZW50KSB7XG4gICAgICAvLyBUT0RPOiB1c2UgcmVmZXJlbmNlIHRvIG5nLW1pbmxlbmd0aCBpbnN0ZWFkIG9mIGhhcmRjb2RpbmcgJzYnXG4gICAgICBpZiAoJGV2ZW50LnRhcmdldC52YWx1ZS5sZW5ndGggPCA2KSB7XG4gICAgICAgIGFuZ3VsYXIuZWxlbWVudCgkZXZlbnQudGFyZ2V0KS50b29sdGlwKCdzaG93Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJGV2ZW50LnRhcmdldCkudG9vbHRpcCgnaGlkZScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbGlkYXRlVXNlcigpIHtcbiAgICAgIHZhciBkYXRhID0ge3VzZXJuYW1lOiB2bS5zdVVzZXJuYW1lfTtcbiAgICAgIC8vIHZtLnN1U29ja2V0TXNnID0gJyc7XG4gICAgICBzb2NrZXQuZW1pdCgndXNlcm5hbWUnLCBkYXRhKTtcbiAgICB9XG4gIH1cbn0pKCk7XG4iLCIoZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyXG4gICAgLm1vZHVsZSgnYXBwJylcbiAgICAuZmFjdG9yeSgnYXV0aFNlcnZpY2UnLCBhdXRoU2VydmljZSk7XG5cbiAgYXV0aFNlcnZpY2UuJGluamVjdCA9IFsnJGh0dHAnLCAnJGxvZyddO1xuXG4gIGZ1bmN0aW9uIGF1dGhTZXJ2aWNlKCRodHRwLCAkbG9nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNpZ251cDogc2lnbnVwLFxuICAgICAgbG9naW46IGxvZ2luLFxuICAgICAgbG9nb3V0OiBsb2dvdXRcbiAgICB9O1xuXG4gICAgLy8vLy8vLy8vLy8vXG5cbiAgICBmdW5jdGlvbiBzaWdudXAodXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvc2lnbnVwJywgZGF0YSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gc3VjY2Vzc0NhbGxiYWNrKHJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH0sIGZ1bmN0aW9uIGVycm9yQ2FsbGJhY2socmVzcG9uc2UpIHtcbiAgICAgICAgICAkbG9nLmVycm9yKCdYSFIgRmFpbGVkIGZvciBhdXRoU2VydmljZS5zaWdudXAnKTtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9naW4odXNlcm5hbWUsIHBhc3N3b3JkKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgdXNlcm5hbWU6IHVzZXJuYW1lLFxuICAgICAgICBwYXNzd29yZDogcGFzc3dvcmRcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBkYXRhKVxuICAgICAgICAudGhlbihmdW5jdGlvbiBzdWNjZXNzQ2FsbGJhY2socmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSwgZnVuY3Rpb24gZXJyb3JDYWxsYmFjayhyZXNwb25zZSkge1xuICAgICAgICAgICRsb2cuZXJyb3IoJ1hIUiBGYWlsZWQgZm9yIGF1dGhTZXJ2aWNlLmxvZ2luJyk7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ291dCgpIHtcbiAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9nb3V0JylcbiAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkbG9nLmVycm9yKCdYSFIgRmFpbGVkIGZvciBhdXRoU2VydmljZS5sb2dvdXQnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2FwcCcpXG4gICAgLmZhY3RvcnkoJ2xheW91dFNlcnZpY2UnLCBsYXlvdXRTZXJ2aWNlKTtcblxuICBsYXlvdXRTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRsb2cnXTtcblxuICBmdW5jdGlvbiBsYXlvdXRTZXJ2aWNlKCRodHRwLCAkbG9nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldFRlbXBsYXRlOiBnZXRUZW1wbGF0ZVxuICAgIH07XG5cbiAgICAvLy8vLy8vLy8vLy9cblxuICAgIGZ1bmN0aW9uIGdldFRlbXBsYXRlKGlkKSB7XG4gICAgICB2YXIgaWQgPSBpZCB8fCAnZGVmYXVsdCc7XG5cbiAgICAgIHJldHVybiAkaHR0cC5nZXQoJy90ZW1wbGF0ZT90ZW1wbGF0ZUlEPScgKyBpZClcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJGxvZy5lcnJvcignWEhSIEZhaWxlZCBmb3IgZ2V0VGVtcGxhdGUnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2FwcCcpXG4gICAgLmZhY3RvcnkoJ3Jlc3VtZVNlcnZpY2UnLCByZXN1bWVTZXJ2aWNlKTtcblxuICByZXN1bWVTZXJ2aWNlLiRpbmplY3QgPSBbJyRodHRwJywgJyRsb2cnXTtcblxuICBmdW5jdGlvbiByZXN1bWVTZXJ2aWNlKCRodHRwLCAkbG9nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldFJlc3VtZURhdGE6IGdldFJlc3VtZURhdGFcbiAgICB9O1xuXG4gICAgLy8vLy8vLy8vLy8vXG5cbiAgICBmdW5jdGlvbiBnZXRSZXN1bWVEYXRhKGF1dGhUb2tlbikge1xuICAgICAgdmFyIGRhdGEgPSB7YXV0aFRva2VuOiBhdXRoVG9rZW59O1xuXG4gICAgICByZXR1cm4gJGh0dHAucG9zdCgnL3Jlc3VtZScsIGRhdGEpXG4gICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICRsb2cuZXJyb3IoJ1hIUiBGYWlsZWQgZm9yIGdldFJlc3VtZURhdGEnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ2FwcCcpXG4gICAgLmZhY3RvcnkoJ3NvY2tldCcsIHNvY2tldCk7XG5cbiAgc29ja2V0LiRpbmplY3QgPSBbJyRyb290U2NvcGUnXTtcblxuICBmdW5jdGlvbiBzb2NrZXQoJHJvb3RTY29wZSkge1xuICAgIHZhciBzb2NrZXQgPSBpby5jb25uZWN0KCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgb246IG9uLFxuICAgICAgZW1pdDogZW1pdFxuICAgIH07XG5cbiAgICAvLy8vLy8vLy8vLy9cblxuICAgIGZ1bmN0aW9uIG9uKGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgICAgIHNvY2tldC5vbihldmVudE5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICRyb290U2NvcGUuJGFwcGx5KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjYWxsYmFjay5hcHBseShzb2NrZXQsIGFyZ3MpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVtaXQoZXZlbnROYW1lLCBkYXRhLCBjYWxsYmFjaykge1xuICAgICAgc29ja2V0LmVtaXQoZXZlbnROYW1lLCBkYXRhLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAkcm9vdFNjb3BlLiRhcHBseShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseShzb2NrZXQsIGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KVxuICAgIH1cbiAgfVxufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
