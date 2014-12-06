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
	$scope.editable = false;
	$scope.helper = { 
		fromToggle: function ($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.helper.fromOpened = true;
		},
		toToggle: function ($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.helper.toOpened = true;
		}
	};
	$scope.tasks = Task.read();
	$scope.projects = Project.read();
	$scope.path = [];
	$scope.select = function (node) {
		$scope.selected = node;
		$scope.selectedBackup = angular.copy(node);
	};
	$scope.cancelEdit = function () {
		angular.forEach($scope.selectedBackup, function (value, key) {
			$scope.selected[key] = value;
		});
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
	$scope.toggleEdit = function () {
		$scope.editable = !$scope.editable;
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

	$scope.getBreadcrumb = function (node) {
		var crumbs = [];
		if (node && node.project) {
			crumbs = crumbs.concat($scope.getBreadcrumb(node.project));
		}
		if (node) {
			crumbs.push(node);
		}
		return crumbs;
	};
	$scope.console = console;
	$scope.states = {
		'task' : [{'id': 12, 'code': 'V', 'title': 'Vytvořený', 'description': 'Nově vytvořený úkol, kterému bude přidělen nový stav na základě dalšího zpracování'},
			{'id': 13, 'code': 'A', 'title': 'Aktivní', 'description': 'Aktuálně zpracovávaný úkol bez časového rámce'},
			{'id': 14, 'code': 'K', 'title': 'V kalendáři', 'description': 'Aktuálně zpracovávaný úkol s časovým rámcem'},
			{'id': 15, 'code': 'H', 'title': 'Hotový', 'description': 'Kompletně zpracovaný úkol'}],
		'project': [{'id': 10, 'code': 'A', 'title': 'Aktivní', 'description': 'Projekt je aktivní'},
			{'id': 11, 'code': 'D', 'title': 'Dokončený', 'description': 'Projek nemůže být dokončen pokud je pod ním neukončený projekt nebo úkol.'}]
	};
});
