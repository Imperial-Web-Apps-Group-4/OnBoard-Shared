'use strict';

const Game = require('../src/Game');
const Action = require('../src/Action');
const Component = require('../src/Component');
const ComponentClass = require('../src/ComponentClass');

describe('Action module', function () {

  it('should have a Movement class', function () {
    // Classes are functions
    expect(typeof Action.Movement).toBe('function');
  });
});

describe('ClassCreate action', function () {
  it('should add a new class to the manifest', function () {
    let testClass = new ComponentClass.GenericClass('test1', 'test2', 2, 4);
    let create = new Action.ClassCreate('testID', testClass);
    let mockGame = new Game();
    mockGame.applyAction(create);
    expect(mockGame.manifest.componentClasses['testID']).toBe(testClass);
  });
});

describe('ComponentSpawn action', function () {
  it('should add a new component to the game', function () {
    let testComp = new Component.GenericComponent('test', 2, 4, 1, 3);
    let spawn = new Action.ComponentSpawn('testID', testComp);
    let mockGame = new Game();
    mockGame.applyAction(spawn);
    expect(mockGame.components['testID']).toBe(testComp);
  });
});

describe('Movement action', function () {
  it('should cause a component to move when applied', function () {
    const X = 34, Y = 39;
    let mockGame = new Game();
    mockGame.components['testID'] = new Component.GenericComponent('classID', 0, 0);

    let mv = new Action.Movement('testID', X, Y);
    mockGame.applyAction(mv);
    expect(mockGame.components['testID'].posX).toBe(X);
    expect(mockGame.components['testID'].posY).toBe(Y);
  });
});

describe('Resize action', function () {
  it('should cause a component to be resized when applied', function () {
    const WIDTH = 34, HEIGHT = 39;
    let mockGame = new Game();
    mockGame.components['testID'] = new Component.GenericComponent('classID', 0, 0);

    let resize = new Action.Resize('testID', WIDTH, HEIGHT);
    mockGame.applyAction(resize);
    expect(mockGame.components['testID'].width).toBe(WIDTH);
    expect(mockGame.components['testID'].height).toBe(HEIGHT);
  });
});

describe('ClassResize action', function () {
  it('should cause a component class to have its default dimensions altered when applied', function () {
    const WIDTH = 34, HEIGHT = 39;
    let mockGame = new Game();
    let testClass = new ComponentClass.GenericClass('test1', 'test2', 2, 4);
    mockGame.manifest.componentClasses['testID'] = testClass;

    let resize = new Action.ClassResize('testID', WIDTH, HEIGHT);
    mockGame.applyAction(resize);
    expect(mockGame.manifest.componentClasses['testID'].defaultWidth).toBe(WIDTH);
    expect(mockGame.manifest.componentClasses['testID'].defaultHeight).toBe(HEIGHT);
  });
});

describe('Flip action', function () {
  it('should flip a flippable component', function () {
    let mockGame = new Game();
    let testComp = new Component.FlippableComponent('test', 2, 4, 1, 3, true);
    mockGame.components['testID'] = testComp;

    let flip = new Action.Flip('testID');
    mockGame.applyAction(flip);
    expect(mockGame.components['testID'].faceDown).toBe(false);
    mockGame.applyAction(flip);
    expect(mockGame.components['testID'].faceDown).toBe(true);
  });
});

describe('Multiple actions', function () {
  it('should allow multiple actions to be executed', function () {
    let mockGame = new Game();
    let testComp = new Component.FlippableComponent('test', 2, 4, 1, 3, true);
    mockGame.components['testID'] = testComp;

    let flip = new Action.Flip('testID');
    mockGame.applyActions(flip, flip);
    expect(mockGame.components['testID'].faceDown).toBe(true);
  });
});
