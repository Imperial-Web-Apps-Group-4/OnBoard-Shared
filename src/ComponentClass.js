'use strict';

module.exports = class ComponentClass {
  constructor(name, imageID, width, height) {
    this.name = name;
    this.imageID = imageID;
    this.defaultWidth = width;
    this.defaultHeight = height;
  }
};
