'use strict';

const Game = require('./src/Game');
const Message = require('./src/Message');
const Action = require('./src/Action');
const Deserialiser = require('./src/Deserialiser');

module.exports = {
  Game: Game,
  Message: Message,
  Action: Action,
  deserialiseGame: Deserialiser.deserialiseGame
};
