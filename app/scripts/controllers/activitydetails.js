'use strict';

/**
 * @ngdoc function
 * @name gtdApp.controller:ActivitydetailsCtrl
 * @description
 * # ActivitydetailsCtrl
 * Controller of the gtdApp
 */
angular.module('gtdApp')
.controller('ActivityDetailsCtrl', function ($scope, $state, Project, Task) {

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
			Task.update(node, function (data) {
				$scope.selected = data;
			}, function () {
				$scope.cancelEdit();
			});
		} else {
			Project.update(node, function (data) {
				$scope.selected = data;
			}, function () {
				$scope.cancelEdit();
			});
		}
	};
	$scope.remove = function (node) {
		if (node.type === 'task') {
			Task.remove({id: node.id}, function () {
				$scope.tasks.splice($scope.tasks.indexOf(node), 1);
				if (node.id === $scope.selected.id) {
					$scope.selected = undefined;
					$state.go('main.dashboard');
				}
			});
		} else {
			Project.remove({id: node.id}, function () {
				$scope.projects.splice($scope.projects.indexOf(node), 1);
				if (node.id === $scope.selected.id) {
					$scope.selected = undefined;
					$state.go('main.dashboard');
				}
			});
		}
	};
});
