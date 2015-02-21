'use strict';

angular.module('scorekeeperViews', [
    'ui.router',
    'scorekeeperWidgets'
]);

angular.module('scorekeeperViews')
    .controller('HomeController', function($scope, $state) {
        $scope.newGame = function() {
            $state.go('game');
        };
    })
    .controller('GameController', function($scope, $timeout) {
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
