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
	return $resource('api/v1/projects/:id', {'id': '@id'}, {
		'read' : {
			'method' : 'GET',
			'isArray' : true,
			'interceptor' : {
				'response' : function (resp) {
					for (var i = 0; i < resp.resource.length; i++) {
						resp.resource[i].type = 'project';
					}
				}
			}
		},
		'create' : {
			'method' : 'POST',
		},
		'update' : {
			'method' : 'PUT',
		},
		'remove' : {
			'method' : 'DELETE',
		}
	});
  });
