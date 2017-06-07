'use strict';

const Game = require('./src/Game');
const Message = require('./src/Message');

module.exports = {
  Game: Game.Game,
  deserialiseGame: Game.deserialiseGame,
  Message: Message.Message,
  GameMessage: Message.GameMessage,
  Action: Message.Action,
  Movement: Message.Movement
}
