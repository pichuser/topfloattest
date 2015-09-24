angular.module('testDirectives.testForm', [])
.directive('testForm', function () {
    return {
        controller: ['$scope', '$http', function ($scope, $http) {
            this.fields = [];
            $scope.fields = this.fields;
            $scope.sendData = function () {
                if (!validate()) {
                    return;
                }
                $http({
                    url: $scope.psAction,
                    method: 'POST',
                    data: getData(),
                }).then(function (response) {
                });
            }
            function getData() {
                var testForm = {};
                _.map($scope.fields, function (el) {
                    testForm[el.label] = el.data;
                });
                return testForm;
            }
            function validate() {
                for (var i = 0; i < $scope.fields.length; i++) {
                    var item = $scope.fields[i];
                    for (var j = 0; j < item.validationRules.length; j++) {
                        var rule = item.validationRules[j];
                        if (rule.required) {
                            if (!item.data) {
                                item.errorMsg = rule.message;
                                return false;
                            }
                        }
                    }
                    return true;
                }
            }
        }],
        transclude: true,
        scope: {
            psAction: '@'
        },
        link: function () { },
        templateUrl: 'testform.html'
    };
});