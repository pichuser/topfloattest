angular.module('testDirectives')
    .directive('testNumber', ['$templateCache', function ($templateCache) {
        return {
            scope:
                {
                    psLabel: '@psLabel',
                    psValidation: '=psValidation',
                    psDisplayName: '@',
                    required: '='
                },
            require: '^testForm',
            compile: function () {
                return {
                    pre: function ($scope, $element, $attrs, parentCtrl) {
                        //parentCtrl.fields.push($scope.data)
                    },
                    post: function ($scope, $element, $attrs, parentCtrl) {
                        parentCtrl.fields.push($scope.inputObject)
                        //++parentCtrl.fields.post;
                        //if (parentCtrl.childCount.post === parentCtrl.childCount.pre) {
                        //    // ... (this runs only on the last linked child)
                        //}
                    }
                };
            },
            controller: function ($scope) {
                $scope.test = function () {
                    alert($scope.inputObject.data);
                }
                $scope.inputObject = {
                    label: $scope.psLabel,
                    displayName: $scope.psDisplayName,
                    validationRules: (!$scope.psValidation ? [] : $scope.psValidation),
                    data: null
                };
            },
            template: $templateCache.get('testNumber/testNumber.html')
        };
    }]);