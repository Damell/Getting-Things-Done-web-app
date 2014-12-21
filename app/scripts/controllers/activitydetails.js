'use strict';

/**
 * @ngdoc function
 * @name gtdApp.controller:ActivitydetailsCtrl
 * @description
 * # ActivitydetailsCtrl
 * Controller of the gtdApp
 */
angular.module('gtdApp')
.controller('ActivityDetailsCtrl', function ($scope, Project, Task) {

	console.log('test');
	$scope.cancelEdit = function () {
		angular.forEach($scope.selectedBackup, function (value, key) {
			$scope.selected[key] = value;
		});
	};
	$scope.toggleEdit = function () {
		$scope.editable = !$scope.editable;
	};
	$scope.update = function (node) {
		if (node.type === 'task') {
			Task.update(node, function () {
				$scope.tasks = Task.read();
			});
		} else {
			Project.update(node, function () {
				$scope.projects = Project.read();
			});
		}
	};
	$scope.remove = function (node) {
		if (node.type === 'task') {
			Task.remove({id: node.id}, function () {
				$scope.tasks = Task.read();
				if (node.id === $scope.selected.id) {
					$scope.selected = undefined;
				}
			});
		} else {
			Project.remove({id: node.id}, function () {
				$scope.projects = Project.read();
				if (node.id === $scope.selected.id) {
					$scope.selected = undefined;
				}
			});
		}
	};
});
