'use strict';

const Game = require('./Game');
const Manifest = require('./Manifest');

module.exports.deserialise = function (data) {
  let game = Object.assign(new Game(), data);
  game.manifest = Object.assign(new Manifest(), data.manifest);
  return game;
};

module.exports.generateUniqueID = function (object) {
  const randomID = () => Math.random().toString(36).slice(2);
  let id = randomID();
  while (object[id] !== undefined) id = randomID();
  return id;
};
