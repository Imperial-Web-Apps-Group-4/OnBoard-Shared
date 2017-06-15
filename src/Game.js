'use strict';

const Manifest = require('./Manifest');
const Component = require('./Component');
const Action = require('./Action');
const Utils = require('./Utils');

module.exports = class Game {
  constructor() {
    this.manifest = new Manifest();
    this.components = {};
  }

  applyAction(action) {
    Action.apply(this, action);
  }

  generateComponentClass(name, imageID, width, height) {
    return this.manifest.generateComponentClass(name, imageID, width, height);
  }

  generateComponent(componentID, posX, posY) {
    const id = Utils.generateUniqueID(this.components);
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
    compClass.defaultWidth = width;
    compClass.defaultHeight = height;
  }

  lockComponent(componentID, lock = true) {
    let compClass = this.manifest.componentClasses[classID];
    compClass.attributes.locked = lock;
  }

  getCoords(componentID) {
    let comp = this.components[componentID];
    return { x: comp.posX, y: comp.posY };
  }
};
