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
]).config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	//
	// Now set up the states
	$stateProvider
	.state('main', {
		url: '/',
		templateUrl: 'views/main.html',
		controller: 'MainCtrl'
	});
});
