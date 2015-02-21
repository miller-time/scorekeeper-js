'use strict';

window.Game = function(title) {
    this.title = title;
    this.players = [];
};

window.Game.prototype.addPlayer = function(name) {
    this.players.push(new window.Player(name));
};
