'use strict';

class Action {
  constructor(type) {
    this.type = type;
  }
}

class ComponentAction extends Action {
  constructor(type, componentID) {
    super(type);
    this.componentID = componentID;
  }
}

module.exports.ClassCreate = class ClassCreate extends Action {
  constructor(classID, newClass) {
    super('classCreate');
    this.classID = classID;
    this.newClass = newClass;
  }
};

module.exports.ComponentSpawn = class ComponentSpawn extends ComponentAction {
  constructor(componentID, component) {
    super('componentSpawn', componentID);
    this.component = component;
  }
};

module.exports.ComponentDelete = class ComponentDelete extends ComponentAction {
  constructor(componentID) {
    super('componentDelete', componentID);
  }
};

module.exports.Movement = class Movement extends ComponentAction {
  constructor(componentID, newX, newY) {
    super('movement', componentID);
    this.newX = newX;
    this.newY = newY;
  }
};

module.exports.Resize = class Resize extends ComponentAction {
  constructor(componentID, newWidth, newHeight) {
    super('resize', componentID);
    this.newWidth = newWidth;
    this.newHeight = newHeight;
  }
};

module.exports.ClassResize = class ClassResize extends Action {
  constructor(classID, newWidth, newHeight) {
    super('classResize');
    this.classID = classID;
    this.newWidth = newWidth;
    this.newHeight = newHeight;
  }
};

module.exports.TakeOwnership = class TakeOwnership extends ComponentAction {
  constructor(componentID, userIdentification) {
    super('takeOwnership', componentID);
    this.userIdentification = userIdentification;
  }
};

module.exports.RemoveOwnership = class RemoveOwnership extends ComponentAction {
  constructor(componentID, userIdentification) {
    super('removeOwnership', componentID);
    this.userIdentification = userIdentification;
  }
};

module.exports.Flip = class Flip extends ComponentAction {
  constructor(componentID) {
    super('flip', componentID);
  }
};
