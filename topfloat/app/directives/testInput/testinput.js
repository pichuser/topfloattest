angular.module('testDirectives')
.controller('testInput', ['$scope', function ($scope) {
    $scope.inputObject.clear = function () {
        if ($scope.psManyValues) {
            $scope.inputObject.data = [{ value: null }];
        } else {
            $scope.inputObject.data = null;
        }
    }
    $scope.addItem = function () {
        if ($scope.inputObject.data[$scope.inputObject.data.length - 1].value != null) {
            $scope.inputObject.data.push({ value: null });
        }
    }
    $scope.removeItem = function (index) {
        if ($scope.inputObject.data.length == 1) {
            $scope.inputObject.data[0].value = null;
        } else {
            $scope.inputObject.data.splice(index, 1);
        }
    }
    $scope.inputObject.data = ($scope.psManyValues ? [{ value: null }] : null);
}])