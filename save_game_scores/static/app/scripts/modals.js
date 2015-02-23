'use strict';

angular.module('scorekeeperModals', []);

angular.module('scorekeeperModals')
    .controller('AddPlayerInfoModalController', function($scope, $modalInstance, player) {
        $scope.player = player;

        $scope.ok = function() {
            $modalInstance.close([player.attrToAdd, player.valToAdd]);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss();
        };
    })
    .controller('ConfirmModalController', function($scope, $modalInstance, message) {
        $scope.message = message;

        $scope.ok = function() {
            $modalInstance.close();
        };

        $scope.cancel = function() {
            $modalInstance.dismiss();
        };
    })
    .factory('confirmModal', function($modal) {
        return function(message) {
            return $modal.open({
                controller: 'ConfirmModalController',
                templateUrl: '/static/app/templates/modals/confirm.html',
                resolve: {
                    message: function() {
                        return message;
                    }
                }
            });
        };
    })
    .controller('NewGameModalController', function($scope, $modalInstance) {
        $scope.newGame = {};

        $scope.ok = function() {
            $modalInstance.close($scope.newGame.title);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss();
        };
    })
    .factory('newGameModal', function($modal, $rootScope, $state) {
        return function() {
            $modal.open({
                controller: 'NewGameModalController',
                templateUrl: '/static/app/templates/modals/new-game.html'
            }).result.then(function(gameTitle) {
                $rootScope.game = new Game(gameTitle);
                $state.go('game');
            });
        };
    });
