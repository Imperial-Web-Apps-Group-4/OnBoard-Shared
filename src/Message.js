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

module.exports = {
  GameMessage: GameMessage,
  InitMessage: InitMessage
}
