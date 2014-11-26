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
	return $resource('api/1.0/projects/:id', {'id': '@id'}, {
		'read' : {
			'method' : 'GET',
			'isArray' : true
		},
		'create' : {
			'method' : 'POST',
			'isArray' : true
		},
		'createWithParent' : {
			'url' : 'api/1.0/projects/:parentId/projects',
			'params' : { 'parentId' : '@parentId'},
			'method' : 'POST',
			'isArray' : true
		},
		'update' : {
			'method' : 'PUT',
			'isArray' : true
		},
		'remove' : {
			'method' : 'DELETE',
			'isArray' : true
		}
	});
  });
