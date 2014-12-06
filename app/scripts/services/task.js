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
	return $resource('api/v1/tasks/:id', {'id': '@id'}, {
		'read' : {
			'method' : 'GET',
			'isArray' : true,
			'interceptor' : {
				'response' : function (resp) {
					for (var i = 0; i < resp.resource.length; i++) {
						resp.resource[i].type = 'task';
						if (resp.resource[i].calendar) {
							if (resp.resource[i].calendar.from) {
								resp.resource[i].calendar.from = new Date(resp.resource[i].calendar.from);
							}
							if (resp.resource[i].calendar.to) {
								resp.resource[i].calendar.to = new Date(resp.resource[i].calendar.to);
							}
						}
					}
					return resp;
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
