'use strict';

describe('Service: Project', function () {

	beforeEach(function () {
		var TEST = true;
	});
	// load the service's module
	beforeEach(module('gtdApp'));

	// instantiate service
	var Project, httpBackend, $window;
	beforeEach(inject(function (_Project_, $httpBackend, _$window_) {
		Project = _Project_;
		httpBackend = $httpBackend;
		$window = _$window_;
		$window.sessionStorage = {
			'username' : 'abc',
			'token' : 'def'
		};
	}));
	it('should create project', function () {
		httpBackend.expectPOST('api/v1/projects', {title: 'Title'}).respond(200, JSON.stringify({title: 'Title', id: 0}));
		httpBackend.expectGET('views/login.html').respond(200, '');

		var project = Project.create({title:'Title'});
		expect(project.id).to.equal(undefined);
		httpBackend.flush();
		expect(project.id).to.equal(0);
		expect(project.title).to.equal('Title');
	});

});
