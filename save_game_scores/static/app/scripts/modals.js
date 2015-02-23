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
    });
