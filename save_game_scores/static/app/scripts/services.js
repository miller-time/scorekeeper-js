'use strict';

angular.module('scorekeeperServices', [
    'ngCookies'
]);

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

        service.getSavedGame = function(gameId) {
            return $http.get('/api/saved_games/' + gameId).then(function(response) {
                if (response.data.saved_game) {
                    return response.data.saved_game;
                } else {
                    throw 'Error fetching saved game for id: ' + gameId;
                }
            }, function(response) {
                throw 'Error fetching saved game: ' + response.data;
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

        service.deleteGame = function(gameId) {
            return $http.delete('/api/saved_games/' + gameId).error(function(response) {
                throw 'Save Game delete error: ' + response;
            });
        };

        return service;
    })
    .factory('gameCache', function($cookies, $window) {
        return {
            get: function(cacheKey) {
                if ($window.localStorage) {
                    return $window.localStorage.getItem(cacheKey);
                } else {
                    return $cookies[cacheKey];
                }
            },
            set: function(cacheKey, val) {
                if ($window.localStorage) {
                    $window.localStorage.setItem(cacheKey, val);
                } else {
                    $cookies[cacheKey] = val;
                }
            }
        };
    });
