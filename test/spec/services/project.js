'use strict';

describe('Service: Project', function () {

  // load the service's module
  beforeEach(module('gtdApp'));

  // instantiate service
  var Project, httpBackend;
  beforeEach(inject(function (_Project_, $httpBackend) {
    Project = _Project_;
    httpBackend = $httpBackend;
  }));
  it('should create project', function () {
	  httpBackend.expectPOST('api/v1/projects', {title: 'Title'}).respond(200, JSON.stringify({title: 'Title', id: 0}));
	  var project = Project.create({title:'Title'});
	  expect(project.id).to.equal(undefined);
	  httpBackend.flush();
	  expect(project.id).to.equal(0);
	  expect(project.title).to.equal('Title');
  });

});
