'use strict';

angular.module('scorekeeper', [
    'ui.bootstrap',
    'ui.router',
    'scorekeeperWidgets',
    'scorekeeperModals',
    'scorekeeperViews'
])
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: '/static/app/templates/views/home.html'
    }).state('profile', {
        url: '/profile',
        templateUrl: '/static/app/templates/views/profile.html'
    }).state('game', {
        url: '/game',
        controller: 'GameController',
        templateUrl: '/static/app/templates/views/game.html'
    });

});
