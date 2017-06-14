'use strict';

const ComponentClass = require('./ComponentClass');
const Utils = require('./Utils');

module.exports = class Manifest {
  constructor() {
    this.componentClasses = {};
  }

  generateComponentClass(name, imageID, width, height) {
    const id = Utils.generateUniqueID(this.componentClasses);
    return {
      id: id,
      compClass: new ComponentClass(name, imageID, width, height)
    };
  }
};
