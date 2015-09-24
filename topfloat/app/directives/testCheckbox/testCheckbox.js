angular.module('testDirectives.testCheckbox', [])
    .directive('testCheckbox', function () {
        return {
            scope:
                {
                    psLabel: '@psLabel',
                    psValidation: '=psValidation',
                    psDisplayName: '@',
                    required: '=',
                    psChoices: '=',
                    psColumnSize: '='
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
                $scope.$on('updateModel', function () {
                    updateModel();
                });
                $scope.psChoices.push({ description: "Выделить все", func: select_unselectAll });
                function select_unselectAll() {
                    var last = _.last($scope.inputObject.data);
                    _($scope.inputObject.data).forEach(function (n) {
                        n.value = last.value;
                    }).value();
                    updateModel();
                }
                $scope.inputObject = {
                    label: $scope.psLabel,
                    displayName: $scope.psDisplayName,
                    validationRules: (!$scope.psValidation ? [] : $scope.psValidation),
                    data: $scope.psChoices
                };
                updateModel();
                function updateModel() {
                    $scope.columnsChoices = _.chunk($scope.inputObject.data, $scope.psColumnSize);
                    _.last($scope.inputObject.data).func = select_unselectAll;
                }
            },
            templateUrl: 'testcheckbox.html'
        };
    });