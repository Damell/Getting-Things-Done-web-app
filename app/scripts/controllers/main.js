'use strict';

/**
 * @ngdoc function
 * @name gtdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gtdAppApp
 */
angular.module('gtdApp')
.controller('MainCtrl', function ($scope, Project, Task) {
	$scope.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];
	$scope.tasks = Task.read();
	$scope.projects = Project.read();
	$scope.path = [];
	$scope.select = function (node) {
		$scope.selected = node;
	};
	$scope.create = {
		choose : function () {
			angular.element('#chooseAction').modal('toggle');
			this.setDefaults();
		},
		send : function () {
			if (this.node && this.node.type === 'project') {
				var parentId = {};
				parentId.parentId = this.node.id;
				if (this.type === 'project') {
					Project.createWithParent(parentId, this.data);
				} else {
					Task.createWithParent(parentId, this.data);
				}
			} else {
				if (this.type === 'project') {
					Project.create(this.data);
				} else {
					Task.create(this.data);
				}
			}
			this.node = undefined;
			this.type = undefined;
			this.data = {};
			angular.element('#chooseAction').modal('toggle');
		},
		setDefaults : function () {
			this.data.creator = 1;
		},
		node : undefined,
		type : undefined,
		data : {}
	};
	$scope.update = function (node) {
	};
	$scope.remove = function (node) {
	};
});
