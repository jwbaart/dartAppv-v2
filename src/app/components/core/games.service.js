(function() {
    'use strict';

    angular
        .module('dartApp.core')
        .factory('GamesService', GamesService);

    GamesService.$inject = ['$firebaseArray', '$firebaseObject', 'firebaseDataService', '$log'];

    /* @ngInject */
    function GamesService($firebaseArray, $firebaseObject, firebaseDataService, $log) {

        //var games = $firebaseArray(firebaseDataService.games);
        var games = null;

        function Game(playerOneUid, playerTwoUid) {
          this.playerOne = playerOneUid || '';
          this.playerTwo = playerTwoUid || '';
          this.scores = new Array();
        }

        function Score(round, oneTotal, twoTotal) {
          this.round = parseInt(round || 0);
          this.one = '';
          this.two = '';
          this.oneTotal = parseInt((oneTotal || 0), 10);
          this.twoTotal = parseInt((twoTotal || 0), 10);

          // this.throwOne = new Throw();
          // this.throwTwo = new Throw();
          // this.throwThree = new Throw();
        }

        var service = {
            Game: Game,
            Score: Score,
            games: games,
            addGame: addGame,
            getGame: getGame,
            getScoresByGame: getScoresByGame,
            addScoreByGame: addScoreByGame,
            activeGame: activeGame,
            getLastScoreOfgame: getLastScoreOfgame,
            reset: reset
        };

        return service;

        ///////////////

        function addGame(playerOneUid, playerTwoUid) {

          var newGame = new Game(playerOneUid, playerTwoUid);

          return games.$add(newGame).then(function(gameRef) {
            var gameKey = gameRef.key();

            return Promise.resolve(gameRef.key());
          }, function(error) {
            $log.log(error);
            return Promise.reject(error);
          });
        }

        function getGame(gameKey) {
          //return $firebaseArray(firebaseDataService.games.child(gameKey));
          //return games.$indexFor(gameKey);
          //return games.$keyAt(gameKey);

          return games.$getRecord(gameKey);
        }

        function getScoresByGame(gameKey) {
          if (gameKey && gameKey.length) {
            return $firebaseArray(firebaseDataService.games.child(gameKey).child('scores'));
          } else {
            return false;
          }

        }

        function addScoreByGame(newScore, gameKey) {
          var scores = getScoresByGame(gameKey);

          return scores.$loaded(function() {

            var lastScore = scores[scores.length-1];

            // Finalize score based on last score
            if (lastScore) {
              newScore.round = lastScore.round + parseInt(1);
              newScore.oneTotal = parseInt(lastScore.oneTotal) + parseInt(newScore.one);
              newScore.twoTotal = parseInt(lastScore.twoTotal) + parseInt(newScore.two);
            } else {
              newScore.round = 1
              newScore.oneTotal = parseInt(newScore.one);
              newScore.twoTotal = parseInt(newScore.two);
            }

            return scores.$add(newScore).then(function (ref) {
              return Promise.resolve(new Score(newScore.round + parseInt(1), newScore.oneTotal, newScore.twoTotal));
            }, function (error) {
              $log.log(error);
              return Promise.reject(newScore);
            });
          });
        }

        function getLastScoreOfgame(gameKey) {
          var scores = getScoresByGame(gameKey);

          return scores.$loaded(function() {
            var lastScore = scores[scores.length-1];

            $log.log('getLastScoreOfgame() : ');
            if (lastScore) {
              $log.log(lastScore);
              return lastScore;
            } else {
              $log.log(new Score());
              return new Score();
            }
          });
        }

        function activeGame(playerUid) {
          createFirebaseConnection();

          var lastGame = games[games.length-1],
              result = false;

          if (lastGame && ((lastGame.playerOne === playerUid) || (lastGame.playerTwo === playerUid))) {
            result = games.$keyAt(lastGame);
          }

          return result;
        }

        function createFirebaseConnection() {
            if (!games) {
              console.log('createFirebaseConnection - games');
              games = $firebaseArray(firebaseDataService.games);
            }
        }

        function reset() {
          if (games) {
            games.$destroy();
            $log.log('reset - games');
            games = null;
          }
        }

        // function Throw() {
        //   this.multiplicity = '';
        //   this.value = '';
        //   this.total = '';
        // }
    }
})();
