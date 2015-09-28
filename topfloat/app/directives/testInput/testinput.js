angular.module('testDirectives')
    .directive('testInput', ['$templateCache', function ($templateCache) {
    	return {
    		scope:
                {
                	psLabel: '@psLabel',
                	psValidation: '=psValidation',
                	psDisplayName: '@',
                	required: '=',
                	psManyValues: '@',
                	psPlaceholder: '@',
					psDescription: '@'
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
    				data: ($scope.psManyValues ? [{ value: null }] : null)
    			};
    			$scope.addItem = function () {
    				if ($scope.inputObject.data[$scope.inputObject.data.length - 1].value != null) {
    					$scope.inputObject.data.push({ value: null });
    				}
    			}
    			$scope.removeItem = function (index) {
    				if ($scope.inputObject.data.length == 1) {
    					$scope.inputObject.data[0].value = null;
    				} else {
    					$scope.inputObject.data.splice(index, 1);
    				}
    			}
    		},
    		template: $templateCache.get('testInput/testInput.html')
    	};
    }]);