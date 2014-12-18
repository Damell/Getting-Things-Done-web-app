'use strict';

/**
 * @ngdoc service
 * @name gtdApp.context
 * @description
 * # context
 * Service in the gtdApp.
 */
angular.module('gtdApp')
  .service('Context', function Context($resource) {
	return $resource('api/v1/contexts/:id', {'id': '@id'}, {
		'read' : {
			'method' : 'GET',
			'isArray' : true
		},
		'create' : {
			'method' : 'POST'
		},
		'update' : {
			'method' : 'PUT'
		},
		'remove' : {
			'method' : 'DELETE',
		}
	});
  });
