'use strict';

describe('Controller: ActivityDetailsCtrl', function () {

  // load the controller's module
  beforeEach(module('gtdApp'));

  var ActivityDetailsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ActivityDetailsCtrl = $controller('ActivityDetailsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
