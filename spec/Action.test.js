const Action = require('../src/Action');

describe('Action', function () {
  it('should have an apply function', function () {
    expect(typeof Action.apply).toBe('function');
  });

  it('should have a Movement class', function () {
    // Classes are functions
    expect(typeof Action.Movement).toBe('function');
  });
});
