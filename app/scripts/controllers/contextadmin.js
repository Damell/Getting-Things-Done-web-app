'use strict';

/**
 * @ngdoc function
 * @name gtdApp.controller:ContextadminCtrl
 * @description
 * # ContextadminCtrl
 * Controller of the gtdApp
 */
angular.module('gtdApp')
.controller('ContextAdminCtrl', function ($scope, Context) {
	$scope.contexts = Context.read();
	$scope.create = function (title) {
		Context.create({'title': title}, function (data) {
			$scope.contexts.push(data);
		});
	};
});
