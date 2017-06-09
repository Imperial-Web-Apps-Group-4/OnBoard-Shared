/* exported Game deserialiseGame */

class Game {
  constructor() {
    this.manifest = new Manifest();
    this.components = {};
  }

  generateComponentClass(name, imageID, width, height) {
    return this.manifest.generateComponentClass(name, imageID, width, height);
  }

  generateComponent(componentID, posX, posY) {
    const id = generateUniqueID(this.components);
    return {
      id: id,
      component: new Component(componentID, posX, posY)
    };
  }

  resizeComponent(componentID, width, height) {
    let component = this.components[componentID];
    component.width = width;
    component.height = height;
  }

  resizeComponentClass(classID, width, height) {
    let compClass = this.manifest.componentClasses[classID];
    component.defaultWidth = width;
    component.defaultHeight = height;
  }

  applyMovement(movement) {
    let component = this.components[movement.componentID];
    component.posX = movement.newX;
    component.posY = movement.newY;
  }

  getCoords(componentID) {
    let comp = this.components[componentID];
    return { x: comp.posX, y: comp.posY };
  }
}

class Manifest {
  constructor() {
    this.componentClasses = {};
  }

  generateComponentClass(name, imageID, width, height) {
    const id = generateUniqueID(this.componentClasses);
    return {
      id: id,
      compClass: new ComponentClass(name, imageID, width, height)
    };
  }
}

class ComponentClass {
  constructor(name, imageID, width, height) {
    this.name = name;
    this.imageID = imageID;
    this.defaultWidth = width;
    this.defaultHeight = height;
  }
}

class Component {
  constructor(classID, posX, posY) {
    this.classID = classID;
    this.posX = posX;
    this.posY = posY;
  }
}

function generateUniqueID(object) {
  const randomID = () => Math.random().toString(36).slice(2);
  let id = randomID();
  while (object[id] !== undefined) id = randomID();
  return id;
}

function deserialise(data) {
  let game = Object.assign(new Game(), data);
  game.manifest = Object.assign(new Manifest(), data.manifest);
  return game;
}

module.exports = {
  Game: Game,
  deserialiseGame: deserialise
};
