'use strict';

window.Game = function(title) {
    /* A game has a gameId once it has been saved to the data store */
    this.gameId = null;
    this.title = title;
    this.players = [];
};

window.Game.prototype.addPlayer = function(name) {
    this.players.push(new window.Player(name));
};

window.Game.prototype.toJSON = function() {
    var j = {
        title: this.title,
        players: []
    };
    angular.forEach(this.players, function(player) {
        j.players.push(player.toJSON());
    });
    return j;
};

window.Game.prototype.toString = function() {
    return JSON.stringify(this.toJSON(), null, 4);
};

window.Game.prototype.load = function(json) {
    var self = this;
    self.title = json.title;
    angular.forEach(json.players, function(playerData) {
        var player = new window.Player();
        player.load(playerData);
        self.players.push(player);
    });
};
