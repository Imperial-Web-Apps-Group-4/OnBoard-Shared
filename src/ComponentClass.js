'use strict';

class ComponentClass {
  constructor(name, defaultWidth, defaultHeight, type, generated = false) {
    this.name = name;
    this.defaultWidth = defaultWidth;
    this.defaultHeight = defaultHeight;
    this.type = type;
    this.generated = generated;
  }
}

module.exports.GenericClass = class GenericClass extends ComponentClass {
  constructor(name, imageID, defaultWidth, defaultHeight, generated = false) {
    super(name, defaultWidth, defaultHeight, 'generic', generated);
    this.imageID = imageID;
  }
};

module.exports.FlippableClass = class FlippableClass extends ComponentClass {
  constructor(name, backImageID, frontImageID, defaultWidth, defaultHeight, generated = false) {
    super(name, defaultWidth, defaultHeight, 'flippable', generated);
    this.backImageID = backImageID;
    this.frontImageID = frontImageID;
  }
};

module.exports.DeckClass = class DeckClass extends ComponentClass {
  constructor(name, backImageID, cardClassIDs, defaultWidth, defaultHeight, generated = false) {
    super(name, defaultWidth, defaultHeight, 'deck', generated);
    this.backImageID = backImageID;
    this.cardClassIDs = cardClassIDs;
  }
};

/* A count of -1 in stacks indicates an infinite stack */
module.exports.StackClass = class StackClass extends ComponentClass {
  constructor(name, imageID, defaultWidth, defaultHeight, defaultCount, itemClassID, generated = false) {
    super(name, defaultWidth, defaultHeight, 'stack', generated);
    this.imageID = imageID;
    this.defaultCount = defaultCount;
  }
};

module.exports.getImageID = function (compClass) {
  switch (compClass.type) {
    case 'flippable':
    case 'deck':
      return compClass.backImageID;
    case 'generic':
    case 'stack':
    default:
      return compClass.imageID;
  }
};
