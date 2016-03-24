(function() {
  'use strict';

  angular
    .module('dartApp.core')
    .factory('PlayersService', PlayersService);

  PlayersService.$inject = ['$firebaseObject', 'firebaseDataService', 'GamesService', '$log'];

  function PlayersService($firebaseObject, firebaseDataService, GamesService, $log) {
    //var players = $firebaseObject(firebaseDataService.players);
    var players = null;


    function Player(name, expires, active, uid) {
      this.name = name || '';
      this.expires = expires || '';
      this.active = active || false;
      this.uid = uid || '';
    }

    var services = {
      players: players,
      addPlayer: addPlayer,
      removePlayer: removePlayer,
      getPlayer: getPlayer,
      showPlayers: showPlayers,
      reset: reset
    }

    return services;

    ////////////////

    function addPlayer(authData) {
      createFirebaseConnection();
      var newPlayer = new Player(authData[authData.provider].displayName, authData.expires, true, authData.uid);

      players.$loaded(function(playersLoaded) {
        console.log('Players originial: ');
        console.log(players);
        players[newPlayer.uid] = newPlayer;
        players.$save().then(function(result) {
          $log.log('Activated player: ' + newPlayer.uid);
          console.log('Players updated: ');
          console.log(players);
        }, function(error) {
          $log.log(error);
        });
      },
      function(error) {
        $log.log(error);
      });
    }

    function removePlayer(authData) {
      createFirebaseConnection();
      
      players.$loaded(function() {
        console.log(players);
        console.log(authData.uid);
        console.log(players[authData.uid]);
        if (players.hasOwnProperty(authData.uid)) {
          players[authData.uid].active = false;
          players.$save().then(function(result) {
            $log.log('Deactivated player: ' + authData.uid);
          }, function(error) {
            $log.log('removePlayer() couldn\'t find user');
          });
        } else {
          $log.log('removePlayer() failed for ' + authData.uid);
        }
      },
      function(error) {
        $log.log(error);
      });
    }

    function getPlayer(uid) {
      return players[uid];
    }

    function showPlayers() {
      createFirebaseConnection()
      players.$loaded(function (result) {
        $log.log(players);
      }, function(error) {
        $log.log(error);
      });
    }

    function createFirebaseConnection() {
        if (!players) {
          $log.log('createFirebaseConnection - players');
          players = $firebaseObject(firebaseDataService.players);
        }
    }

    function reset() {
      if (players) {
        players.$destroy();
        players = null;
      }
    }
  }
})();
