'use strict';

angular.module('scorekeeper', ['ui.bootstrap', 'ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider.state('home', {
            url: '/',
            templateUrl: '/static/app/views/home.html'
        }).state('profile', {
            url: '/profile',
            templateUrl: '/static/app/views/profile.html'
        });

    });
