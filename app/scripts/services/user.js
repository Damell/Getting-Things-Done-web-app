'use strict';

/**
 * @ngdoc service
 * @name gtdApp.User
 * @description
 * # User
 * Service in the gtdApp.
 */
angular.module('gtdApp')
.service('User', function User($http) {
	return {
		'authenticate' : function (data) {
			return $http.get('api/v1/authenticate/' + data.username, {headers: {'password' : data.password}});
		},
		'setSession' : function (user) {
			window.sessionStorage.username = user.userName;
			window.sessionStorage.token = user.token;
		},
		'getSession' : function () {
			return {userName: window.sessionStorage.username, token: window.sessionStorage.token};
		},
		'getToken' : function () {
			return window.sessionStorage.token;
		},
		'isAuthenticated' : function () {
			return window.sessionStorage.username && window.sessionStorage.token;
		},
		'clearSession' : function () {
			window.sessionStorage.removeItem('username');
			window.sessionStorage.removeItem('token');
		},
		'signup' : function (data) {
			return $http.post('api/v1/persons', data);
		}
	};
	/**	$resource('api/v1/authenticate/:username', {'username': '@username'}, {
	  'login' : {
	  'method': 'GET',
	  'transformRequest' : function (data, headersGetter) {
	  console.log(data);
	  console.log(headersGetter);
	  return data;
	  }
	  }
	  });
	  */
});
