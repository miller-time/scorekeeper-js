'use strict';

angular.module('scorekeeper', [
    'ui.bootstrap',
    'ui.router',
    'scorekeeperViews'
])
.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: '/static/app/views/home.html'
    }).state('profile', {
        url: '/profile',
        templateUrl: '/static/app/views/profile.html'
    }).state('game', {
        url: '/game',
        controller: 'GameController',
        templateUrl: '/static/app/views/game.html'
    });

});
