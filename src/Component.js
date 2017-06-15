'use strict';

module.exports = class Component {
  constructor(classID, posX, posY, locked = false) {
    this.classID = classID;
    this.posX = posX;
    this.posY = posY;
    this.locked = locked;
    /*this.width = -1;
    this.height = -1;*/
  }
};
