'use strict';

/**
 * @ngdoc function
 * @name gtdApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gtdApp
 */
angular.module('gtdApp')
.controller('LoginCtrl', function ($scope, $rootScope, $state, User) {
	User.clearSession();
	$scope.login = function (username, password) {
		User.authenticate({username: username, password: password}).success(function(data) {
			$rootScope.user = data;
			User.setSession(data);
			$state.go('main.dashboard');
		});
	};
	$scope.signup = function (name, surname, username, password) {
		User.signup({name: name, surname: surname, username: username, password: password}).success(function(data) {
			console.log(data);
			$rootScope.user = data;
			User.setSession(data);
			$state.go('main.dashboard');
		});
	};
});
