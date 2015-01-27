'use strict';

describe('Service: context', function () {

  // load the service's module
  beforeEach(module('gtdApp'));

  // instantiate service
  var Context;
  beforeEach(inject(function (_Context_) {
    Context = _Context_;
  }));

  it('should do something', function () {
    expect(!!Context).to.equal(true);
  });

});
