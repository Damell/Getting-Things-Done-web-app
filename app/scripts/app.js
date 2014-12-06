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
	});

	$httpProvider.interceptors.push(function($q) {
		return {
			'request': function(config) {
				if (config && config.data && config.data.calendar) {
					config.data = angular.copy(config.data);
					if (config.data.calendar.from) {
						config.data.calendar.from = config.data.calendar.from ? config.data.calendar.from.valueOf() : undefined;
					}
					if (config.data.calendar.to) {
						config.data.calendar.to = config.data.calendar.to ? config.data.calendar.to.valueOf() : undefined;
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
});
