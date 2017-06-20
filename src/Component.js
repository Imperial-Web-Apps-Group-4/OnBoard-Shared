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
    this.owned = false;
    this.owner = null;
    this.aspectRatioLock = true;
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

class DiceComponent extends Component {
  constructor(classID, posX, posY, width, height, sides) {
    super(classID, posX, posY, width, height, 'dice');
    this.shownside = 1;
    this.sides = sides;
  }
}

module.exports.GenericComponent   = GenericComponent;
module.exports.DeckComponent      = DeckComponent;
module.exports.FlippableComponent = FlippableComponent;
module.exports.StackComponent     = StackComponent;
module.exports.DiceComponent      = DiceComponent;

module.exports.getImageID = function (component, compClass) {
  switch (component.type) {
    case 'deck':
      return component.count !== 0 ? compClass.backImageID : EMPTY_DECK_IMAGE_ID;
    case 'flippable':
      return component.faceDown ? compClass.backImageID : compClass.frontImageID;
    case 'dice':
    case 'generic':
    case 'stack':
    default:
      return compClass.imageID;
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
  'stack': StackComponent,
  'dice': DiceComponent
};
