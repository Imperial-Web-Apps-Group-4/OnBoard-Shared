'use strict';

const Game = require('../src/Game');
const Action = require('../src/Action');
const Component = require('../src/Component');

describe('Action module', function () {
  it('should have an apply function', function () {
    expect(typeof Action.apply).toBe('function');
  });

  it('should have a Movement class', function () {
    // Classes are functions
    expect(typeof Action.Movement).toBe('function');
  });
});

describe('Movement action', function () {
  it('should cause a component to move when applied', function () {
    const X = 34, Y = 39;
    let mv = new Action.Movement('testID', X, Y);
    let mockGame = new Game();
    mockGame.components['testID'] = new Component('classID', 0, 0);
    mockGame.applyAction(mv);
    expect(mockGame.components['testID'].posX).toBe(X);
    expect(mockGame.components['testID'].posY).toBe(Y);
  });
});
