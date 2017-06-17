'use strict';

const EMPTY_DECK_IMAGE_ID = 'empty_deck';

class Component {
  constructor(classID, posX, posY, width, height, type) {
    this.classID = classID;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.type = type;
    this.locked = false;
  }
}

class GenericComponent extends Component {
  constructor(classID, posX, posY, width, height) {
    super(classID, posX, posY, width, height, 'generic');
  }
}

class DeckComponent extends Component {
  constructor(classID, posX, posY, width, height) {
    super(classID, posX, posY, width, height, 'deck');
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

module.exports.getComponentImage = function (game, component) {
  let compClass = game.getClass[component.classID];
  switch (component.type) {
    case 'generic':
    case 'stack':
      return compClass.imageID;
    case 'deck':
      return component.count !== 0 ? compClass.backImageID : EMPTY_DECK_IMAGE_ID;
    case 'flippable':
      return component.faceDown ? compClass.backImageID : compClass.frontImageID;
    default:
      return null;
  }
};

module.exports.fromClass = function (classID, compClass) {
  let Component = compDict[compClass.type];
  let constructorArgs = [null, classID, 0, 0, compClass.defaultWidth, compClass.defaultHeight];
  if (compClass.type === 'stack') constructorArgs.push(compClass.defaultCount);
  return new (Component.bind.apply(Component, constructorArgs));
};

let compDict = {
  'generic': GenericComponent,
  'deck': DeckComponent,
  'flippable': FlippableComponent,
  'stack': StackComponent
};
