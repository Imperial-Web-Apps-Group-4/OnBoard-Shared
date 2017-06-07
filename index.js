const Game = require('Game');
const Message = require('Message');

module.exports = {
  Game: Game.Game,
  deserialiseGame: Game.deserialiseGame,
  Message: Message.Message,
  GameMessage: Message.GameMessage,
  Action: Message.Action,
  Movement: Message.Movement
}