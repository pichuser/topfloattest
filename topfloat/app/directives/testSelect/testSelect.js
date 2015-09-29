angular.module('testDirectives')
.controller('testSelect', ['$scope', function ($scope) {
	if ($scope.inputObject.data == null) {
		setInitValue();
	}
	function setInitValue() {
		if (!$scope.required) {
			if ($scope.psEmptyValue) {
				$scope.inputObject.data = $scope.psEmptyValue;
			} else {
				$scope.inputObject.data = '<не выбрано>';
			}
		} else {
			$scope.inputObject.data = $scope.psChoices[0].description;
		}
	}
	$scope.inputObject.clear = function () {
		setInitValue();
	}
	$scope.inputObject.getData = function () {
		if ($scope.inputObject.data == '<не выбрано>' || $scope.inputObject.data == $scope.psEmptyValue) {
			return null;
		} else {
			return $scope.inputObject.data;
		}
	}
	$scope.inputObject.setData = function (value) {
		if (value == null) {
			setInitValue();
		} else {
			$scope.inputObject.data = value;
		}
	}

	$scope.changeVisibleBody = function () {
		$scope.IsVisibleBody = !$scope.IsVisibleBody;
	}
	$scope.select = function (value) {
		$scope.inputObject.data = value;
		$scope.changeVisibleBody();
	}
}]);