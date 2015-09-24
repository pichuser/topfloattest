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
            psAction: '@',
            psInitData: '@',
            psFormName: '@'
        },
        link: function (scope, element, attrs) {
            attrs.$observe('psInitData', function (data) {
                try{
                    var obj = JSON.parse(data);
                } catch (er) { }
                if (obj) {
                    for (var i = 0; i < scope.fields.length; i++) {
                        item = scope.fields[i];
                        item.data = obj[item.label];
                    }
                } else {
                    for (var i = 0; i < scope.fields.length; i++) {
                        item = scope.fields[i];
                        item.data = null;
                    }
                }
            });
        },
        templateUrl: 'testform.html'
    };
});