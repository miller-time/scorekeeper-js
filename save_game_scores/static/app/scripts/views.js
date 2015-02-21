'use strict';

angular.module('scorekeeperViews', [
    'ui.router'
]);

angular.module('scorekeeperViews')
    .controller('HomeController', function($scope, $state) {
        $scope.newGame = function() {
            $state.go('game');
        };
    })
    .controller('GameController', function($scope) {
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
    });
