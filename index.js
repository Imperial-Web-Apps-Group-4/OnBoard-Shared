'use strict';

const Game = require('./src/Game');
const Message = require('./src/Message');

module.exports = {
  Game: Game.Game,
  deserialiseGame: Game.deserialiseGame,
  Message: Message.Message,
  GameMessage: Message.GameMessage,
  InitMessage: Message.InitMessage,
  Action: Message.Action,
  Movement: Message.Movement
}
