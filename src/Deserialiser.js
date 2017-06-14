var Game = require('./Game');
const Manifest = require('./Manifest');

module.exports.deserialiseGame = function (data) {
  let game = Object.assign(new Game(), data);
  game.manifest = Object.assign(new Manifest(), data.manifest);
  return game;
};
