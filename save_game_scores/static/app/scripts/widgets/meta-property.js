'use strict';

angular.module('scorekeeperWidgets')
    .directive('metaProperty', function() {
        var head = angular.element(document.head);
        return {
            restrict: 'A',
            link: function(scope, elem) {
                head.append(elem);

                scope.$on('$destroy', function() {
                    elem.remove();
                });
            }
        };
    });
