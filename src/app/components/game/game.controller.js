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
        $firebaseArray(firebaseDataService.games)

        vm.games = GamesService.games;
        vm.scores = {};
        vm.invitePlayer = InvitationsService.invitePlayer;
        vm.gameKey = '';
        vm.players = PlayersService.players;

        activate();

        /////////////////////

        function activate() {
          if ($routeParams.hasOwnProperty('gameKey')) {
            vm.gameKey = $routeParams.gameKey
            vm.scores = GamesService.getScoresByGame($routeParams.gameKey);

            // vm.scores.$loaded(function(scores) {
            //   // Set current total score
            //   if (scores.length) {
            //     // TODO: move to addNewScore, so it's updated at last moment
            //     var lastScore = scores[scores.length-1];
            //
            //     vm.newScore.oneTotal = lastScore.oneTotal + lastScore.one;
            //     vm.newScore.twoTotal = lastScore.twoTotal + lastScore.two;
            //     vm.newScore.round = lastScore.round + 1;
            //   }
            // });
          }
        }

        // function addNewScore () {
        //   // ToDo: How to check completeness of newScore more easily?
        //   if (angular.isNumber(vm.newScore.one) && angular.isNumber(vm.newScore.two)) {
        //
        //       vm.newScore.oneTotal = vm.newScore.oneTotal + vm.newScore.one;
        //       vm.newScore.twoTotal = vm.newScore.twoTotal + vm.newScore.two;
        //
        //       vm.scores.$add(vm.newScore);
        //       //vm.scores.$add(vm.newScore);
        //
        //       vm.newScore = new GamesService.Score(vm.newScore.round + parseInt(1), vm.newScore.oneTotal, vm.newScore.twoTotal);
        //
        //   } else {
        //     console.log('error');
        //     //TODO: Generate error message
        //   }
        // }
    }
})();
