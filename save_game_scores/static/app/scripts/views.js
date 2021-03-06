'use strict';

angular.module('scorekeeperViews', [
    'ui.bootstrap',
    'ui.router',
    'scorekeeperWidgets',
    'scorekeeperModals'
]);

angular.module('scorekeeperViews')
    .filter('dateFromString', function() {
        return function(input) {
            return new Date(input).toString();
        };
    })
    .controller('HomeController', function($scope, $rootScope, newGameModal, gameCache, savedGameApi) {
        $scope.game = $rootScope.game;

        if (!$scope.game) {
            var cachedGameId = gameCache.get('gameId');
            if (cachedGameId) {
                savedGameApi.getSavedGame(cachedGameId).then(function(savedGame) {
                    $scope.game = new Game();
                    $scope.game.load(JSON.parse(savedGame.game_data));
                    $scope.game.gameId = savedGame.game_id;
                    $rootScope.game = $scope.game;
                });
            }
        }

        $scope.newGame = function() {
            newGameModal();
        };
    })
    .controller('ProfileController', function($scope, $rootScope, $state, $timeout, savedGameApi, confirmModal, newGameModal) {
        $scope.game = $rootScope.game;

        var loadGames = function() {
            savedGameApi.getSavedGames().then(function(savedGames) {
                $scope.savedGames = [];
                angular.forEach(savedGames, function(savedGame) {
                    var game = new Game();
                    game.load(JSON.parse(savedGame.game_data));
                    game.gameId = savedGame.game_id;
                    game.updated = new Date(savedGame.updated);
                    game.playerList = game.players.map(function(player) {
                        return player.name;
                    }).join(', ');
                    $scope.savedGames.push(game);
                });
            });
        };
        loadGames();

        $scope.newGame = function() {
            newGameModal();
        };

        $scope.playGame = function(game) {
            $rootScope.game = game;
            $state.go('game');
        };

        $scope.deleteGame = function(game) {
            if (game.gameId) {
                confirmModal('delete this game').result.then(function() {
                    savedGameApi.deleteGame(game.gameId).then(function() {
                        $timeout(function() {
                            loadGames();
                        }, 750);
                    });
                });
            } else {
                throw 'Cannot delete game. It has no game ID! Please refresh the page and try again.';
            }
        };
    })
    .controller('GameController', function($scope, $rootScope, $timeout, $modal, savedGameApi, confirmModal, gameCache) {
        $scope.game = $rootScope.game;

        var cachedGameId, cachedGamePromise;
        if (!$scope.game) {
            cachedGameId = gameCache.get('gameId');
            if (cachedGameId) {
                cachedGamePromise = savedGameApi.getSavedGame(cachedGameId).then(function(savedGame) {
                    $scope.game = new Game();
                    $scope.game.load(JSON.parse(savedGame.game_data));
                    $scope.game.gameId = savedGame.game_id;
                    $rootScope.game = $scope.game;

                    angular.forEach($scope.game.players, function(player) {
                        player.collapseHistory = true;
                    });
                });
            }
        }

        if (!$scope.game && !cachedGameId && !cachedGamePromise) {
            $scope.game = new Game('Click here to set game title');
            $rootScope.game = $scope.game;
        }

        $scope.newPlayer = {};
        $scope.addPlayer = function(name) {
            if ($scope.game) {
                $scope.game.addPlayer(name);
                $scope.newPlayer.name = '';
            } else {
                throw 'No game to add a player to!';
            }
        };

        $scope.addPoints = function(player) {
            player.addPoints(player.pointsToAdd);
            player.pointsToAdd = '';
        };

        $scope.addInfo = function(player) {
            $modal.open({
                controller: 'AddPlayerInfoModalController',
                templateUrl: '/static/app/templates/modals/add-player-info.html',
                resolve: {
                    player: function() {
                        return player;
                    }
                }
            }).result.then(function(attrVal) {
                player.setCustomAttribute(attrVal[0], attrVal[1]);
            });
        };

        $scope.deleteInfo = function(player, attr) {
            player.removeCustomAttribute(attr);
        };

        $scope.deletePlayer = function(player) {
            confirmModal('remove this player').result.then(function() {
                $scope.game.players.splice($scope.game.players.indexOf(player), 1);
            });
        };

        $scope.getUrl = function() {
            if ($scope.game && $scope.game.gameId) {
                return 'http://save-game-scores.appspot.com/#/snapshot/' + $scope.game.gameId;
            }
        };

        $scope.getTitle = function() {
            if ($scope.game) {
                return $scope.game.title;
            }
        };

        $scope.getDescription = function() {
            if ($scope.game) {
                return $scope.game.scoreSummary();
            }
        };

        $scope.shareGame = function() {
            var url = $scope.getUrl();
            if (url) {
                FB.ui({
                    method: 'share',
                    href: url,
                }, function(response){});
            }
        };

        $scope.getAttrToolTip = function(player, attr) {
            return '<b>' + attr + ' :</b> ' + player.metadata[attr];
        };

        /*
            Auto-save
            ---------
            Detects any changes in game data (on a 750ms timeout)
            Logs that there was a change
            @TODO: when game is stored server-side, send request to save changes
        */
        var gameDataChangeTimeout;
        $scope.$watch('game', function(newVal, oldVal) {
            if (newVal === oldVal) {
                return;
            }
            if (gameDataChangeTimeout) {
                $timeout.cancel(gameDataChangeTimeout);
            }
            gameDataChangeTimeout = $timeout(function() {
                if ($scope.game.gameId) {
                    savedGameApi.updateSavedGame($scope.game.gameId, $scope.game.toString());
                } else {
                    savedGameApi.saveGame($scope.game.toString()).then(function(gameId) {
                        $scope.game.gameId = gameId;
                        gameCache.set('gameId', gameId);
                    });
                }
            }, 750);
        }, true);
    })
    .controller('SnapshotController', function($scope, $stateParams, savedGameApi) {
        if ($stateParams.gameId) {
            savedGameApi.getSavedGame($stateParams.gameId).then(function(savedGame) {
                $scope.game = new Game();
                $scope.game.load(JSON.parse(savedGame.game_data));
                $scope.game.gameId = savedGame.gameId;

                angular.forEach($scope.game.players, function(player) {
                    player.collapseHistory = true;
                });
            });
        } else {
            $state.go('home');
        }
    });
