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
    this.metadataKeys = [];
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
    if (this.metadataKeys.indexOf(attribute) === -1) {
        this.metadataKeys.push(attribute);
        this.metadataKeys.sort();
    }
    this.metadata[attribute] = value;
};

window.Player.prototype.removeCustomAttribute = function(attribute) {
    this.metadata[attribute] = undefined;
    this.metadataKeys.splice(this.metadataKeys.indexOf(attribute), 1);
};

window.Player.prototype.toJSON = function() {
    var j = {
        name: this.name,
        score: this.score,
        scoreHistory: [],
        metadata: this.metadata,
        metadataKeys: this.metadataKeys
    };
    angular.forEach(this.scoreHistory, function(history) {
        j.scoreHistory.push({
            delta: history.delta,
            score: history.score
        });
    });
    return j;
};

window.Player.prototype.toString = function() {
    return JSON.stringify(this.toJSON(), null, 4);
};

window.Player.prototype.load = function(json) {
    this.name = json.name;
    this.score = json.score;
    this.scoreHistory = json.scoreHistory;
    this.metadata = json.metadata;
    this.metadataKeys = json.metadataKeys;
};
