const Message = require('../src/Message');

describe('Message module', function () {
  it('should have an InitMessage class', function () {
    expect(typeof Message.InitMessage).toBe('function');
  });
});
