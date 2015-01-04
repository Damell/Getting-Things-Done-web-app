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
	$scope.create = function (title) {
		Context.create({'title': title}, function (data) {
			$scope.contexts.push(data);
		});
	};
	$scope.update = function (context) {
		Context.update(context, function (data) {
			context = data;
		});
	};
	$scope.remove = function (context) {
		Context.remove(context, function () {
			$scope.contexts.splice($scope.contexts.indexOf(context), 1);
		});
	};
});
