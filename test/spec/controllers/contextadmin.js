'use strict';

describe('Controller: ContextAdminCtrl', function () {

  // load the controller's module
  beforeEach(module('gtdApp'));

  var ContextAdminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContextAdminCtrl = $controller('ContextAdminCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
