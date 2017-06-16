'use strict';

const Game = require('./src/Game');
const ComponentClass = require('./src/ComponentClass');
const Component = require('./src/Component');
const Message = require('./src/Message');
const Action = require('./src/Action');

module.exports = {
  Game: Game,
  ComponentClass: ComponentClass,
  Component: Component,
  Message: Message,
  Action: Action,
  deserialiseGame: deserialiseGame
};

function deserialiseGame(data) {
  return Object.assign(new Game(), data);
}
