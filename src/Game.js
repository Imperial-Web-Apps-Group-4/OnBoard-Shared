'use strict';

module.exports = class Game {
  constructor() {
    this.manifest = {};
    this.manifest.componentClasses = {};
    this.components = {};
  }

  getCoords(componentID) {
    let comp = this.components[componentID];
    return { x: comp.posX, y: comp.posY };
  }

  getClass(classID) {
    return this.manifest.componentClasses[classID];
  }

  applyAction(action) {
    let func = actionFunctions[action.type].bind(this);
    if (func === undefined) {
      console.error('[Unrecognised action] Attempt to apply unrecognised action');
      return;
    }
    return func(action);
  }

  /* If undo etc implemented, actions sent to this function would be treated
   * as 1 history item */
  applyActions() {
    Array.from(arguments).forEach(this.applyAction.bind(this));
  }
};

let actionFunctions = {
  'classCreate':     applyClassCreate,
  'componentSpawn':  applyComponentSpawn,
  'componentDelete': applyComponentDelete,
  'movement':        applyMovement,
  'resize':          applyResize,
  'classResize':     applyClassResize,
  'flip':            applyFlip,
  'takeOwnership':   applyTakeOwnership,
  'removeOwnership': applyRemoveOwnership
};

/* *** Action application functions *** */
function applyClassCreate(classCreate) {
  classCreate.classID = classCreate.classID || generateUniqueKey(this.manifest.componentClasses);
  this.manifest.componentClasses[classCreate.classID] = classCreate.newClass;
  return classCreate;
}

function applyComponentSpawn(componentSpawn) {
  componentSpawn.componentID = componentSpawn.componentID || generateUniqueKey(this.components);
  this.components[componentSpawn.componentID] = componentSpawn.component;
  return componentSpawn;
}

function applyComponentDelete(componentDelete) {
  delete this.components[componentDelete.componentID];
}

function applyMovement(movement) {
  let component = this.components[movement.componentID];
  component.posX = movement.newX;
  component.posY = movement.newY;
}

function applyResize(resize) {
  let component = this.components[resize.componentID];
  component.width = resize.newWidth;
  component.height = resize.newHeight;
}

function applyClassResize(classResize) {
  let compClass = this.manifest.componentClasses[classResize.classID];
  compClass.defaultWidth = classResize.newWidth;
  compClass.defaultHeight = classResize.newHeight;
}

function applyFlip(flip) {
  let component = this.components[flip.componentID];
  if (component.type !== 'flippable') {
    console.error('[Bad action] Flip action not applied to flippable component');
    return;
  }
  component.faceDown = !component.faceDown;
}

function applyTakeOwnership(takeOwnership) {
  let component = this.components[takeOwnership.componentID];
  if (component.owned !== false) {
    console.error('[Bad action] Attempt to take ownership of a component which is already owned');
    return;
  }
  component.owned = true;
  component.owner = takeOwnership.userIdentification;
}

function applyRemoveOwnership(removeOwnership) {
  let component = this.components[removeOwnership.componentID];
  if (component.owned !== true || component.owner !== removeOwnership.userIdentification) {
    console.error('[Bad action] Attempt to remove ownership of a component which is not owned by the specified user');
    return;
  }
  component.owned = false;
  component.owner = null;
}

function applyRoll(roll) {
  let component = this.components[roll.componentID];
  if (component.type !== 'dice') {
    console.error('[Bad action] Roll action not applied to dice component');
    return;
  }
  component.shownside = 1; // should be random
  
}

function generateUniqueKey(object) {
  const randomID = () => Math.random().toString(36).slice(2);
  let key = randomID();
  while (object[key] !== undefined) key = randomID();
  return key;
}
