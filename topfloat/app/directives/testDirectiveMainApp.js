var testfunction = function () {
}
testfunction.prototype.clear = function () {
	this.data = null;
}
testfunction.prototype.getData = function () {
	return this.data;
}
testfunction.prototype.setData = function (value) {
	this.data = value;
}
testfunction.prototype.isValidRequire = function () {
	if (this.required && !this.data) {
		this.errorMsg = "Поле обязательно";
		return false;
	} else {
		return true;
	}
}
angular.module('testDirectives', [
])
.directive('generalTestDirective', ['$compile', '$templateCache', function ($compile, $templateCache) {
	var getTemplateName = function (type) {
		return type + '/' + type + '.html';
	}
	return {
		link: function (scope, element, attrs, parentCtrl) {
			element.html($templateCache.get(getTemplateName(scope.psDirectiveType)));
			$compile(element.contents())(scope);
			parentCtrl.fields.push(scope.inputObject);
		},
		scope: {
			psDirectiveType: '@',
			psLabel: '@psLabel',
			psValidation: '=psValidation',
			psDisplayName: '@',
			required: '=',
			psChoices: '=',
			psColumnSize: '=',
			psDescription: '@',
			psPlaceholder: '@',
			psManyValues: '@',
			psEmptyValue: '@'
		},
		controller: function ($scope, $controller) {
			$scope.inputObject = new testfunction();
			$scope.inputObject.data = null;
			$scope.inputObject.label = $scope.psLabel;
			$scope.inputObject.displayName = $scope.psDisplayName;
			$scope.inputObject.validationRules = (!$scope.psValidation ? [] : $scope.psValidation);
			$scope.inputObject.description = $scope.psDescription;
			$scope.inputObject.required = $scope.required;
			$controller($scope.psDirectiveType, { $scope: $scope });
			$scope.clearError = function () {
				$scope.inputObject.errorMsg = '';
			}
		},
		require: '^testForm'
	}
}]);