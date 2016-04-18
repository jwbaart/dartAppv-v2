(function() {
  'use strict';

  angular
    .module('dartApp.core')
    .factory('PlayersService', PlayersService);

  PlayersService.$inject = ['$firebaseObject', 'firebaseDataService', 'GamesService', '$log', 'AuthService'];

  function PlayersService($firebaseObject, firebaseDataService, GamesService, $log, AuthService) {
    //var players = $firebaseObject(firebaseDataService.players);
    var players = null,
      playerUid = null;


    function Player(name, expires, active, uid, isAdmin) {
      this.name = name || '';
      this.expires = expires || '';
      this.active = active || false;
      this.uid = uid || '';
      this.isAdmin = isAdmin || false;
    }

    var services = {
      players: players,
      addPlayer: addPlayer,
      removePlayer: removePlayer,
      isAdmin: isAdmin,
      getPlayer: getPlayer,
      getPlayers: getPlayers,
      reset: reset
    }

    return services;

    ////////////////

    function addPlayer(authData) {
      var isAdmin = false;

      createFirebaseConnection();

      if (authData.uid === 'google:113517797324394678664') {
        isAdmin = true;
      }
      console.log(authData.uid, isAdmin);
      var newPlayer = new Player(authData[authData.provider].displayName, authData.expires, true, authData.uid, isAdmin);

      players.$loaded(function() {
          players[newPlayer.uid] = newPlayer;
          players.$save().then(function() {
            $log.log('Activated player: ' + newPlayer.uid);
            playerUid = newPlayer.uid;
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

      return players.$loaded(function() {
          if (players.hasOwnProperty(authData.uid)) {
            players[authData.uid].active = false;
            players.$save().then(function() {
              $log.log('Deactivated player: ' + authData.uid);
              return Promise.resolve();
            }, function() {
              $log.log('removePlayer() couldn\'t find user');
              return Promise.reject();
            });
          } else {
            $log.log('removePlayer() failed for ' + authData.uid);
            return Promise.reject();
          }
        },
        function(error) {
          $log.log(error);
          return Promise.reject();
        });
    }

    function isAdmin() {
      createFirebaseConnection();

      var result = false;

      if (players && playerUid) {
        // check objects for availability of keys
        if (players.hasOwnProperty(playerUid) && players[playerUid].hasOwnProperty('isAdmin')) {
          result = players[playerUid].isAdmin;
        }
      }
      return result;
    }

    function getPlayer(uid) {
      return players[uid];
    }

    function getPlayers() {
      createFirebaseConnection();
      return players;
    }

    function createFirebaseConnection() {
      // Only start if logged in
      if (AuthService.getAuth()) {
        if (!players) {
          $log.log('createFirebaseConnection - players');
          players = $firebaseObject(firebaseDataService.players);
        }

        if (!playerUid) {
          playerUid = AuthService.getAuth().uid;
          console.log('createFirebaseConnection - playerUid: ' + playerUid);
        }
      }
    }

    function reset() {
      if (players) {
        players.$destroy();
        players = null;
        $log.log('reset - players');
      }
    }
  }
})();
