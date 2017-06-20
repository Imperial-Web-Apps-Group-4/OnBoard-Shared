'use strict';

class ComponentClass {
  constructor(name, imageID, defaultWidth, defaultHeight, type) {
    this.name = name;
    this.imageID = imageID;
    this.defaultWidth = defaultWidth;
    this.defaultHeight = defaultHeight;
    this.type = type;
  }
}

module.exports.GenericClass = class GenericClass extends ComponentClass {
  constructor(name, imageID, defaultWidth, defaultHeight) {
    super(name, imageID, defaultWidth, defaultHeight, 'generic');
  }
};

module.exports.DeckClass = class DeckClass extends ComponentClass {
  constructor(name, backImageID, cardComponentIDs, defaultWidth, defaultHeight) {
    super(name, backImageID, defaultWidth, defaultHeight, 'deck');
    this.backImageID = backImageID;
    this.cardComponentIDs = cardComponentIDs;
  }
};

module.exports.FlippableClass = class FlippableClass extends ComponentClass {
  constructor(name, backImageID, frontImageID, defaultWidth, defaultHeight) {
    super(name, backImageID, defaultWidth, defaultHeight, 'flippable');
    this.backImageID = backImageID;
    this.frontImageID = frontImageID;
  }
};

/* A count of 0 in stacks indicates an infinite stack */
module.exports.StackClass = class StackClass extends ComponentClass {
  constructor(name, imageID, defaultWidth, defaultHeight, defaultCount) {
    super(name, imageID, defaultWidth, defaultHeight, 'stack');
    this.defaultCount = defaultCount;
  }
};

module.exports.DiceClass = class DiceClass extends ComponentClass {
  constructor(name, imageID, sides, defaultWidth, defaultHeight) {
    super(name, imageID, defaultWidth, defaultHeight, 'dice');
    this.sides = sides;
    this.sideIDs = {};
  }
};
