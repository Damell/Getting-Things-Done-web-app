'use strict';

/**
 * @ngdoc service
 * @name gtdApp.Project
 * @description
 * # Project
 * Service in the gtdApp.
 */
angular.module('gtdApp')
.service('Project', function Project($resource) {
	return $resource('api/1.0/projects', {}, {
		'read' : {
			'method' : 'GET',
			'isArray' : true
		}
	});
  });
