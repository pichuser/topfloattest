angular.module('testDirectives.testForm', [])
.directive('testForm', function () {
    return {
        controller: function ($scope) {
            this.fields = [];
            $scope.fields = this.fields;
            $scope.sendData = function () {
                validate();
            }
            function validate() {
                for (var i = 0; i < $scope.fields.length; i++) {
                    var item = $scope.fields[i];
                    for (var j = 0; j < item.validationRules.length; j++) {
                        var rule = item.validationRules[j];
                        if (rule.required) {
                            if (!item.data) {
                                item.errorMsg = rule.message;
                            }
                        }
                    }
                }
            }
        },
        transclude: true,
        scope: false,
        link: function () { },
        templateUrl: 'testform.html'
    };
});