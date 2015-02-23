'use strict';

angular.module('scorekeeperWidgets')
    .controller('EditSpanController', function($scope) {
        $scope.mode = 'view';

        $scope.keyUpHandler = function($event) {
            if ($event.keyCode === 9 || $event.keyCode === 13) {  // tab or enter
                $scope.mode = 'view';
            }
        };
    })
    .directive('editSpan', function() {
        return {
            restrict: 'E',
            scope: {
                spanContents: '='
            },
            replace: true,
            controller: 'EditSpanController',
            templateUrl: '/static/app/templates/widgets/edit-span.html'
        };
    });
