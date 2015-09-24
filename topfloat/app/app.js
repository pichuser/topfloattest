'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'testDirectives'
])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'viewTestForm.html'
    });
    $routeProvider.otherwise({ redirectTo: '/view1' });
}])
.constant('_', window._)
// use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {
      $rootScope._ = window._;
  });