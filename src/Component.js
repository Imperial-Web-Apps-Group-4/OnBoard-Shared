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
  }
}

module.exports.GenericComponent = class GenericComponent extends Component {
  constructor(classID, posX, posY, width, height) {
    super(classID, posX, posY, width, height, 'generic');
  }
};

module.exports.DeckComponent = class DeckComponent extends Component {
  constructor(classID, posX, posY, width, height) {
    super(classID, posX, posY, width, height, 'deck');
  }
};

module.exports.FlippableComponent = class FlippableComponent extends Component {
  constructor(classID, posX, posY, width, height, faceDown) {
    super(classID, posX, posY, width, height, 'flippable');
    this.faceDown = faceDown;
  }
};

module.exports.StackComponent = class StackComponent extends Component {
  constructor(classID, posX, posY, width, height, initialCount) {
    super(classID, posX, posY, width, height, 'stack');
    this.count = initialCount;
  }
};

module.exports.getComponentImage = function (game, component) {
  let compClass = game.manifest.componentClasses[component.classID];
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
