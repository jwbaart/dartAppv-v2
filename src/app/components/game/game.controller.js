(function() {
    'use strict';

    angular
        .module('dartApp.game')
        .controller('GameController', GameController);

    GameController.$inject = ['$firebaseArray', 'firebaseDataService', 'PlayersService', 'GamesService', 'InvitationsService', '$routeParams'];

    /* @ngInject */
    function GameController($firebaseArray, firebaseDataService, PlayersService, GamesService, InvitationsService, $routeParams) {
        var vm = this;

        //console.log($routeParams.gameKey);
        $firebaseArray(firebaseDataService.games);

        vm.games = GamesService.games;
        vm.scores = {};
        vm.invitePlayer = InvitationsService.invitePlayer;
        vm.gameKey = '';
        vm.players = PlayersService.getPlayers();

        activate();

        /////////////////////

        function activate() {
          if ($routeParams.hasOwnProperty('gameKey')) {
            vm.gameKey = $routeParams.gameKey;
            vm.scores = GamesService.getScoresByGame($routeParams.gameKey);
          }
        }
    }
})();
