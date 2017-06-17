const Component = require('../src/Component');
const ComponentClass = require('../src/ComponentClass');
const Game = require('../src/Game');

describe('Component module', function () {
  it('should allow you to construct a stack component from a stack class', function () {
    let mockGame = new Game();
    let testClass = new ComponentClass.StackClass('test1', 'test2', 234, 235, 10);
    mockGame.manifest.componentClasses.testClass = testClass;

    let component = Component.fromClass('testClass', testClass);
    expect(component.classID).toBe('testClass');
    expect(component.posX).toBe(0);
    expect(component.posY).toBe(0);
    expect(component.width).toBe(234);
    expect(component.height).toBe(235);
    expect(component.type).toBe('stack');
    expect(component.locked).toBe(false);
    expect(component.count).toBe(10);
  });
});

describe('Component module', function () {
  it('should allow you to construct a generic component from a generic class', function () {
    let mockGame = new Game();
    let testClass = new ComponentClass.GenericClass('test1', 'test2', 234, 235);
    mockGame.manifest.componentClasses.testClass = testClass;

    let component = Component.fromClass('testClass', testClass);
    expect(component.classID).toBe('testClass');
    expect(component.posX).toBe(0);
    expect(component.posY).toBe(0);
    expect(component.width).toBe(234);
    expect(component.height).toBe(235);
    expect(component.type).toBe('generic');
    expect(component.locked).toBe(false);
  });
});
