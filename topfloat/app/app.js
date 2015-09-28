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
controller('ViewController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
    $scope.choices = [{ description: 'Общение' },
         { description: 'Знание иностранных языков' },
        { description: 'Готовка' },
        { description: 'Бег с препятствиями' },
        { description: 'Быстрое чтение' },
        { description: 'Бокс' },
        { description: 'Пение' },
        { description: 'Программирование' },
        { description: 'Вождение' }
    ];
    $scope.parent = {};
    $scope.clearForm = function () {
        $scope.parent.data = null;
        $timeout(function () { $scope.$broadcast('updateModel'); }, 0);
    }
    $scope.restoreForm = function () {
        $http({
            method: 'POST',
            url: '/getsavedform'
        }).then(function (response) {
            $scope.parent.data = angular.copy(response.data);
            $timeout(function () { $scope.$broadcast('updateModel'); }, 0);
        });
    }
}])
.constant('_', window._)
// use in views, ng-repeat="x in _.range(3)"
  .run(function ($rootScope) {
      $rootScope._ = window._;
  });