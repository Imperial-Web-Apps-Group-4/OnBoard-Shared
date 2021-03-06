'use strict';

const EMPTY_DECK_IMAGE_ID = 'empty_deck';
const DEFAULT_Z_INDEX = 1;

class Component {
  constructor(classID, posX, posY, width, height, type) {
    this.classID = classID;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.type = type;
    this.locked = false;
    this.owned = false;
    this.owner = null;
    this.aspectRatioLock = true;
    this.zIndex = DEFAULT_Z_INDEX;
  }
}

class GenericComponent extends Component {
  constructor(classID, posX, posY, width, height) {
    super(classID, posX, posY, width, height, 'generic');
  }
}

class DeckComponent extends Component {
  constructor(classID, posX, posY, width, height, currentCardClasses) {
    super(classID, posX, posY, width, height, 'deck');
    this.currentCardClasses = currentCardClasses;
  }
}

class FlippableComponent extends Component {
  constructor(classID, posX, posY, width, height, faceDown = true) {
    super(classID, posX, posY, width, height, 'flippable');
    this.faceDown = faceDown;
  }
}

class StackComponent extends Component {
  constructor(classID, posX, posY, width, height, initialCount) {
    super(classID, posX, posY, width, height, 'stack');
    this.count = initialCount;
  }
}

module.exports.GenericComponent   = GenericComponent;
module.exports.DeckComponent      = DeckComponent;
module.exports.FlippableComponent = FlippableComponent;
module.exports.StackComponent     = StackComponent;

module.exports.getImageID = function (component, compClass) {
  switch (component.type) {
    case 'deck':
      return component.currentCardClasses.length !== 0 ? compClass.backImageID : EMPTY_DECK_IMAGE_ID;
    case 'flippable':
      return component.faceDown ? compClass.backImageID : compClass.frontImageID;
    case 'stack':
      return component.count !== 0 ? compClass.imageID : EMPTY_DECK_IMAGE_ID;
    case 'generic':
    default:
      return compClass.imageID;
  }
};

module.exports.fromClass = function (classID, compClass) {
  let Component = compDict[compClass.type];
  let constructorArgs = [null, classID, 0, 0, compClass.defaultWidth, compClass.defaultHeight];
  if (compClass.type === 'stack') constructorArgs.push(compClass.defaultCount);
  else if (compClass.type == 'deck') constructorArgs.push(compClass.cardClassIDs.slice());
  return new (Component.bind.apply(Component, constructorArgs));
};

let compDict = {
  'generic': GenericComponent,
  'deck': DeckComponent,
  'flippable': FlippableComponent,
  'stack': StackComponent
};
