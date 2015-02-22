'use strict';

angular.module('scorekeeperServices', []);

angular.module('scorekeeperServices')
    .factory('savedGameApi', function($http) {
        var service = {};

        service.getSavedGames = function() {
            return $http.get('/api/saved_games').then(function(response) {
                var savedGames = [];
                if (response.data.saved_games) {
                    savedGames = response.data.saved_games;
                }
                return savedGames;
            }, function(response) {
                throw 'Error fetching saved games: ' + response.data;
            });
        };

        service.updateSavedGame = function(gameId, json) {
            return $http.put('/api/saved_games/' + gameId, json).error(function(response) {
                throw 'Save Game update error: ' + response;
            });
        };

        service.saveGame = function(json) {
            return $http.post('/api/saved_games', json).then(function(response) {
                if (response.data.game_id) {
                    return response.data.game_id;
                } else {
                    throw 'No game_id for saved game!';
                }
            }, function(response) {
                throw 'Save Game update error: ' + response.data;
            });
        };

        return service;
    });
