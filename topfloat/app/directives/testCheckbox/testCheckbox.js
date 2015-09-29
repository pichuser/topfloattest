angular.module('testDirectives')
.controller('testCheckbox', ['$scope', function ($scope) {
    $scope.inputObject.data = $scope.psChoices;
    $scope.inputObject.clear = function () {
        for (var j = 0; j < $scope.inputObject.data.length; j++) {
            $scope.inputObject.data[j].value = null;
        }
    }
    $scope.$on('updateModel', function () {
        updateModel();
    });
    $scope.psChoices.push({ description: "Выделить все", func: select_unselectAll });
    updateModel();
    function select_unselectAll() {
        var last = _.last($scope.inputObject.data);
        _($scope.inputObject.data).forEach(function (n) {
            n.value = last.value;
        }).value();
        updateModel();
    }
    function updateModel() {
        $scope.columnsChoices = _.chunk($scope.inputObject.data, $scope.psColumnSize);
        _.last($scope.inputObject.data).func = select_unselectAll;
    }
}])