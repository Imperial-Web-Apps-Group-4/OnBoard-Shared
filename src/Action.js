'use strict';

class Action {
  constructor(type) {
    this.type = type;
  }
}

module.exports.apply = function (game, action) {
  switch (action.type) {
    case 'movement':
      applyMovement(game, action);
      break;
    default:
      console.error('[Unrecognised action]');
  }
};

module.exports.Movement = class Movement extends Action {
  constructor(componentID, newX, newY) {
    super('movement');
    this.componentID = componentID;
    this.newX = newX;
    this.newY = newY;
  }
};


function applyMovement(game, movement) {
  let component = game.components[movement.componentID];
  component.posX = movement.newX;
  component.posY = movement.newY;
}
