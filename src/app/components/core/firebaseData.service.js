(function () {
    'use strict';

    angular
        .module('dartApp.core')
        .factory('firebaseDataService', firebaseDataService);

    firebaseDataService.$inject = ['FIREBASE_URL'];

    function firebaseDataService(FIREBASE_URL) {
        var root = new Firebase(FIREBASE_URL);

        var service = {
            root: root,
            players: root.child('players'),
            games: root.child('games'),
            invitations: root.child('invitations'),
            scores: root.child('scores')
        };

        return service;

        ///////////////
    }
})();
