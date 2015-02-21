'use strict';

window.Player = function(name, score) {
    if (angular.isUndefined(score)) {
        score = 0;
    }

    this.name = name;
    this.score = score;
    this.scoreHistory = [{
        score: score
    }];
    this.metadata = {};
};

window.Player.prototype.addPoints = function(delta) {
    this.score += delta;
    this.scoreHistory.push({
        delta: delta,
        score: this.score
    });
};

/*
    Custom Attributes
    -----------------

    Players can have additional attributes like "phase" or "level"
*/
window.Player.prototype.setCustomAttribute = function(attribute, value) {
    this.metadata.attribute = value;
};
