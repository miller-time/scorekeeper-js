'use strict';

angular.module('scorekeeperViews', [
    'ui.router'
]);

angular.module('scorekeeperViews')
    .controller('HomeController', function($scope, $rootScope, $state) {
        $scope.newGame = function() {
            $rootScope.game = new Game('Phase 10');
            $state.go('game');
        };
    })
    .controller('GameController', function($scope, $rootScope) {
        $scope.game = $rootScope.game;
    });
