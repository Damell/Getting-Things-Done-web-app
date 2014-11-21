'use strict';

/**
 * @ngdoc service
 * @name gtdApp.Task
 * @description
 * # Task
 * Service in the gtdApp.
 */
angular.module('gtdApp')
  .service('Task', function Task($resource) {
 	return $resource('api/1.0/tasks', {}, {
		'read' : {
			'method' : 'GET',
			'isArray' : true
		}
	});
  });
