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
angular.module('testDirectives', [
])
.directive('generalTestDirective',['$compile', '$templateCache', function ($compile, $templateCache) {
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
            psManyValues: '@'
        },
        controller: function ($scope, $controller) {
            $scope.inputObject = new testfunction();
            $scope.inputObject.data = null;
            $scope.inputObject.label = $scope.psLabel;
            $scope.inputObject.displayName = $scope.psDisplayName;
            $scope.inputObject.validationRules = (!$scope.psValidation ? [] : $scope.psValidation);
            $scope.inputObject.description = $scope.psDescription;
            $controller($scope.psDirectiveType, { $scope: $scope });
        },
        require: '^testForm'
    }
}]);