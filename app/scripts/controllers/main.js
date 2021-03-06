'use strict';

/**
 * @ngdoc function
 * @name gtdApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gtdAppApp
 */
angular.module('gtdApp')
.controller('MainCtrl', function ($rootScope, $scope, $state, Project, Task, Context, User) {
	$rootScope.doneFilter = false;
	$scope.editable = false;
	$scope.tasks = Task.read();
	$scope.projects = Project.read();
	$scope.path = [];
	$scope.console = console;
	$scope.contexts = Context.read();
	$scope.states = {
		'task' : [{'id': 12, 'code': 'V', 'title': 'Vytvořený', 'description': 'Nově vytvořený úkol, kterému bude přidělen nový stav na základě dalšího zpracování'},
			{'id': 13, 'code': 'A', 'title': 'Aktivní', 'description': 'Aktuálně zpracovávaný úkol bez časového rámce'},
			{'id': 14, 'code': 'K', 'title': 'V kalendáři', 'description': 'Aktuálně zpracovávaný úkol s časovým rámcem'},
			{'id': 15, 'code': 'H', 'title': 'Hotový', 'description': 'Kompletně zpracovaný úkol'}],
		'project': [{'id': 10, 'code': 'A', 'title': 'Aktivní', 'description': 'Projekt je aktivní'},
			{'id': 11, 'code': 'D', 'title': 'Dokončený', 'description': 'Projek nemůže být dokončen pokud je pod ním neukončený projekt nebo úkol.'}]
	};

	$scope.select = function (node) {
		$scope.selected = node;
		$scope.selectedBackup = angular.copy(node);
		$state.go('main.activityDetails');
	};
	$scope.create = {
		choose : function () {
			this.type = undefined;
			angular.element('#chooseAction').modal('toggle');
			this.setDefaults();
		},
		send : function () {
			if (this.type === 'project') {
				Project.create(this.data, function (project) {
					$scope.projects.push(project);
				});
			} else {
				Task.create(this.data, function (task) {
					$scope.tasks.push(task);
				});
			}
			this.node = undefined;
			this.type = undefined;
			this.data = {};
			angular.element('#chooseAction').modal('toggle');
		},
		setDefaults : function () {
		},
		node : undefined,
		type : undefined,
		data : {}
	};
	$scope.findProjectById = function (id) {
		var project;
		angular.forEach($scope.projects, function (node) {
			if (node.id === id) {
				project = node;
			}
		});
		return project;
	};
	$scope.getBreadcrumb = function (node) {
		var crumbs = [];
		if (node && node.project) {
			crumbs = $scope.getBreadcrumb( $scope.findProjectById(node.project.id) );
		}
		if (node) {
			crumbs.push(node);
		}
		return crumbs;
	};
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
		},
		doneFilterToggle: function () {
			$rootScope.doneFilter = !$rootScope.doneFilter;
		}
	};
	$scope.logout = function () {
		User.clearSession();
		$rootScope.user = undefined;
	};
	$scope.isContextFilterActive = function () {
		var active = false;
		angular.forEach($scope.contexts, function (context) {
			if (context.filter) {
				active = true;
			}
		});
		return active;
	};
});

