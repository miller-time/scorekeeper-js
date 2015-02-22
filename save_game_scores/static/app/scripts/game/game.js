'use strict';

window.Game = function(title) {
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
    this.title = json.title;
    angular.forEach(json.players, function(playerData) {
        var player = new window.Player();
        player.load(playerData);
        this.players.push(player);
    });
};
