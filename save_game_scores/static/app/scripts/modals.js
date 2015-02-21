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
    });
