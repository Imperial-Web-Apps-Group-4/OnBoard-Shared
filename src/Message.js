'use strict';

class Message {
  constructor(type) {
    this.type = type;
  }

  serialise() {
    return JSON.stringify(this);
  }
}

class GameMessage extends Message {
  constructor(action) {
    super('game');
    this.action = action;
  }
}

class InitMessage extends Message {
  constructor(version, initialState) {
    super('init');
    this.version = version;
    this.initialState = initialState;
  }
}

class Action {
  constructor(type) {
    this.type = type;
  }
}

class Movement extends Action {
  constructor(componentID, newX, newY) {
    super('movement');
    this.componentID = componentID;
    this.newX = newX;
    this.newY = newY;
  }
}

module.exports = {
  Message: Message,
  GameMessage: GameMessage,
  InitMessage: InitMessage,
  Action: Action,
  Movement: Movement
}
