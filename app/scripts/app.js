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
	'ui.router'
]).config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	$urlRouterProvider.otherwise('/');
	//
	// Now set up the states
	$stateProvider
	.state('main', {
		url: '/',
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	})
	.state('main.dashboard', {
		templateUrl: 'views/dashboard.html'
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

	$httpProvider.interceptors.push(function($q) {
		return {
			'request': function(config) {
				if (config) {
					config.headers['token'] = 'XXXMichalXXX';
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
				window.alert(response.status + ' ' + response.statusText);
				console.log(response);
				return $q.reject(response);
			}
		};
	});
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
});
