'use strict';

/**
 * @ngdoc overview
 * @name gtdApp
 * @description
 * # gtdAppApp
 *
 * Main module of the application.
 */
angular
.module('gtdApp', [
	'ngResource',
	'ui.bootstrap',
	'ui.router',
	'ui.calendar'
]).config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	$urlRouterProvider.otherwise('/');
	//
	// Now set up the states
	$stateProvider
	.state('login', {
		templateUrl: 'views/login.html',
		controller: 'LoginCtrl',
		url: '/login'
	})
	.state('main', {
		url: '/',
		templateUrl: 'views/main.html',
		controller: 'MainCtrl',
		abstract: true
	})
	.state('main.dashboard', {
		templateUrl: 'views/dashboard.html',
		url: ''
	})
	.state('main.activityDetails', {
		templateUrl: 'views/activitydetails.html',
		controller: 'ActivityDetailsCtrl'
	})
	.state('main.contextAdmin', {
		templateUrl: 'views/contextadmin.html',
		controller: 'ContextAdminCtrl'
	})
	.state('main.calendar', {
		templateUrl: 'views/calendar.html',
		controller: 'CalendarCtrl'
	});

	$httpProvider.interceptors.push(function($q, $rootScope, $location) {
		return {
			'request': function(config) {
				if (config) {
					if ($rootScope.user) {
						config.headers.token = $rootScope.user.token;
					}
					if (config.data && config.data.calendar) {
						config.data = angular.copy(config.data);
						if (config.data.calendar.from) {
							config.data.calendar.from = config.data.calendar.from ? config.data.calendar.from.valueOf() : undefined;
						}
						if (config.data.calendar.to) {
							config.data.calendar.to = config.data.calendar.to ? config.data.calendar.to.valueOf() : undefined;
						}
					}
				}
				return config || $q.when(config);
			},
			'responseError' : function(response) {
				if (response.status === 401) {
					$location.path('/login');
				}
				window.alert(response.status + ' ' + response.statusText);
				return $q.reject(response);
			}
		};
	});
}).run(function ($rootScope, $location, $state, User) {

	if (User.isAuthenticated()) {
		$rootScope.user = User.getSession();
		$location.path('/');
	} else {
		$location.path('/login');
	}

}).filter('doneFilter', function () {
	return function (nodes, toggle) {
		if (toggle) {
			var arr = [];
			angular.forEach(nodes, function (node) {
				if (node.state && node.state.id !== 11 && node.state.id !== 15) {
					arr.push(node);
				}
			});
			return arr;
		} else {
			return nodes;
		}
	};
}).filter('parentFilter', function () {
	return function (nodes, parentId) {
		var arr = [];
		angular.forEach(nodes, function (node) {
			if (node.project && node.project.id === parentId) {
				arr.push(node);
			} else if (!parentId && !node.project) {
				arr.push(node);
			}
		});
		return arr;
	};
}).filter('getIndent', function () {
	return function (nodes) {
		var out = '';
		angular.forEach(nodes, function () {
			out += '>';
		});
		return out.slice(0, -1);
	};
}).filter('contextFilter', function () {
	return function (nodes, contexts) {
		var arr = [];
		var flag = true;
		var contextFilterActive = false;
		angular.forEach(nodes, function (node) {
			flag = true;
			angular.forEach(contexts, function (context) {
				if (context.filter) {
					contextFilterActive = true;
					if (flag && node.context && node.context.id === context.id) {
						arr.push(node);
						flag = false;
					}
				}
			});
		});
		return contextFilterActive ? arr : nodes;
	};
});
