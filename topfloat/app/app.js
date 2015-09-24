'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'testDirectives'
])
.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'viewTestForm.html',
        controller: 'ViewController'
    });
    $routeProvider.otherwise({ redirectTo: '/view1' });
}]).    
controller('ViewController', ['$scope', '$http', function ($scope, $http) {
    $scope.parent = { data: { test: "jkjkj" } };
    $scope.clearForm = function () {
        $scope.parent.data = null;
    }
    $scope.restoreForm = function(){
        $http({
            method: 'POST',
            url: '/getsavedform'
        }).then(function (response) {
            $scope.parent.data = response.data;
        });
    }
}])
.constant('_', window._)
// use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {
      $rootScope._ = window._;
  });