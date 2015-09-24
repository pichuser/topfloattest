angular.module('testDirectives.testCheckbox', [])
    .directive('testCheckbox', function () {
        return {
            scope:
                {
                    psLabel: '@psLabel',
                    psValidation: '=psValidation',
                    psDisplayName: '@',
                    required: '=',
                    psChoices: '='
                },
            require: '^testForm',
            compile: function () {
                return {
                    pre: function ($scope, $element, $attrs, parentCtrl) {
                    },
                    post: function ($scope, $element, $attrs, parentCtrl) {
                        parentCtrl.fields.push($scope.inputObject)
                    }
                };
            },
            controller: function ($scope) {
                $scope.inputObject = {
                    label: $scope.psLabel,
                    displayName: $scope.psDisplayName,
                    validationRules: (!$scope.psValidation ? [] : $scope.psValidation),
                    data: $scope.psChoices
                };
            },
            templateUrl: 'testcheckbox.html'
        };
    });