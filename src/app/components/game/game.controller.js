(function() {
    'use strict';

    angular
        .module('dartApp.game')
        .controller('GameController', GameController);

    GameController.$inject = ['$firebaseArray', 'firebaseDataService', 'PlayersService', 'GamesService', 'InvitationsService', 'AdminService', 'AuthService', '$routeParams'];

    /* @ngInject */
    function GameController($firebaseArray, firebaseDataService, PlayersService, GamesService, InvitationsService, AdminService, AuthService, $routeParams) {
        var vm = this;

        //console.log($routeParams.gameKey);
        $firebaseArray(firebaseDataService.games);

        vm.games = GamesService.games;
        vm.scores = {};
        vm.newGame = {};
        //vm.invitePlayer = InvitationsService.invitePlayer;
        vm.gameKey = '';
        vm.players = PlayersService.getPlayers();
        //vm.addGameType = GamesService.addGameType;
        vm.getGameTypes = AdminService.getGameTypes;
        vm.addNewGame = addNewGame;
        vm.newGameForm = {};
        vm.uid = AuthService.getAuth().uid;

        activate();

        /////////////////////

        function activate() {
          if ($routeParams.hasOwnProperty('gameKey')) {
            vm.gameKey = $routeParams.gameKey;
            vm.scores = GamesService.getScoresByGame($routeParams.gameKey);
          }
        }

        function addNewGame(opponent, gameType) {
          console.log(vm.newGame);
          if (opponent && gameType) {
            console.log(vm.newGame);
            InvitationsService.invitePlayer(opponent, gameType);
          }
        }
    }
})();
