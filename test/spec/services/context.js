'use strict';

describe('Service: context', function () {

  // load the service's module
  beforeEach(module('gtdApp'));

  // instantiate service
  var context;
  beforeEach(inject(function (_context_) {
    context = _context_;
  }));

  it('should do something', function () {
    expect(!!context).toBe(true);
  });

});
