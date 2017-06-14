'use strict';

class Message {
  constructor(type) {
    this.type = type;
  }

  serialise() {
    return JSON.stringify(this);
  }
}

module.exports.GameMessage = class GameMessage extends Message {
  constructor(action) {
    super('game');
    this.action = action;
  }
}

module.exports.InitMessage = class InitMessage extends Message {
  constructor(version, initialState) {
    super('init');
    this.version = version;
    this.initialState = initialState;
  }
}
