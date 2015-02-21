'use strict';

angular.module('scorekeeperViews', [
    'ui.bootstrap',
    'ui.router',
    'scorekeeperWidgets',
    'scorekeeperModals'
]);

angular.module('scorekeeperViews')
    .controller('HomeController', function($scope, $state) {
        $scope.newGame = function() {
            $state.go('game');
        };
    })
    .controller('GameController', function($scope, $timeout, $modal) {
        $scope.game = new Game('Phase 10');

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
                console.log('game data change detected');
            }, 750);
        }, true);
    });
