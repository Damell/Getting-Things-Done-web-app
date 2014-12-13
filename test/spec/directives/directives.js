'use strict';

describe('Directive: directives', function () {

  // load the directive's module
  beforeEach(module('gtdApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should test contenteditable model <-> view binding', inject(function ($compile) {
    element = angular.element('<div contenteditable="true" ng-model="content">content</div>');
    element = $compile(element)(scope);
    expect(element.text()).to.equal('content');
    scope.content = 'change';
    scope.$digest();
    expect(element.text()).to.equal('change');
  }));
});
