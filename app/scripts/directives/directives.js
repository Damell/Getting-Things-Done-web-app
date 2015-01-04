'use strict';

/**
 * @ngdoc directive
 * @name gtdApp.directive:directives
 * @description
 * # directives
 */
angular.module('gtdApp')
.directive('contenteditable', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			// view -> model
			elm.bind('blur', function() {
				scope.$apply(function() {
					ctrl.$setViewValue(elm.html().replace(/(<([^>]+)>)/ig,'').replace(/&nbsp;/ig,''));
				});
			});

			// model -> view
			ctrl.$render = function() {
				elm.html(ctrl.$viewValue || '');
			};

			// load init value from DOM
		}
	};
});
