'use strict';

describe('Controller: CalendarCtrl', function () {

	// load the controller's module
	beforeEach(module('gtdApp'));

	var CalendarCtrl,
	scope;

	// Initialize the controller and a mock scope
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		CalendarCtrl = $controller('CalendarCtrl', {
			$scope: scope
		});
	}));

	it('should attach a list of awesomeThings to the scope', function () {
	});
});
