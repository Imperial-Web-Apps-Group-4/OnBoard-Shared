'use strict';

const Action = require('./Action');

module.exports = class Game {
  constructor() {
    this.manifest = {};
    this.components = {};
    this.manifest.componentClasses = {};
    this.actionFunctions = {
      'classCreate':    this.applyClassCreate.bind(this),
      'componentSpawn': this.applyComponentSpawn.bind(this),
      'movement':       this.applyMovement.bind(this),
      'resize':         this.applyResize.bind(this),
      'classResize':    this.applyClassResize.bind(this),
      'flip':           this.applyFlip.bind(this),
    };
  }

  getCoords(componentID) {
    let comp = this.components[componentID];
    return { x: comp.posX, y: comp.posY };
  }

  applyAction(action) {
    let func = this.actionFunctions[action.type];
    if (func === undefined) {
      console.error('[Unrecognised action] Attempt to apply unrecognised action');
      return;
    }
    func(action);
  }

  /* *** Action application functions *** */
  applyClassCreate(classCreate) {
    let id = classCreate.classID || generateUniqueKey(this.manifest.componentClasses);
    this.manifest.componentClasses[id] = classCreate.newClass;
  }

  applyComponentSpawn(componentSpawn) {
    let id = componentSpawn.componentID || generateUniqueKey(this.components);
    this.components[id] = componentSpawn.component;
  }

  applyMovement(movement) {
    let component = this.components[movement.componentID];
    component.posX = movement.newX;
    component.posY = movement.newY;
  }

  applyResize(resize) {
    let component = this.components[resize.componentID];
    component.width = resize.newWidth;
    component.height = resize.newHeight;
  }

  applyClassResize(classResize) {
    let compClass = this.manifest.componentClasses[classResize.classID];
    compClass.defaultWidth = classResize.newWidth;
    compClass.defaultHeight = classResize.newHeight;
  }

  applyFlip(flip) {
    let component = this.components[flip.componentID];
    if (component.type !== 'flippable') {
      console.error('[Bad action] Flip action not applied to flippable component');
      return;
    }
    component.faceDown = !component.faceDown;
  }
};

function generateUniqueKey(object) {
  const randomID = () => Math.random().toString(36).slice(2);
  let key = randomID();
  while (object[key] !== undefined) key = randomID();
  return key;
}
