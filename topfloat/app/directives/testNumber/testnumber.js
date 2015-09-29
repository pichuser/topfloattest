 angular.module('testDirectives')
.controller('testNumber', ['$scope', function ($scope) {
    $scope.increaseNumber = function () {
        $scope.inputObject.data++;
    }
    $scope.decreaseNumber = function () {
        $scope.inputObject.data--;
    }
}]);