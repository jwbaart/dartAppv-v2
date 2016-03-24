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
      getPlayers: getPlayers,
      showPlayers: showPlayers,
      reset: reset
    }

    return services;

    ////////////////

    function addPlayer(authData) {
      createFirebaseConnection();
      var newPlayer = new Player(authData[authData.provider].displayName, authData.expires, true, authData.uid);

      players.$loaded(function(playersLoaded) {
        players[newPlayer.uid] = newPlayer;
        players.$save().then(function(result) {
          $log.log('Activated player: ' + newPlayer.uid);
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
          players.$save().then(function(result) {
            $log.log('Deactivated player: ' + authData.uid);
            return Promise.resolve();
          }, function(error) {
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

    function getPlayer(uid) {
      return players[uid];
    }

    function getPlayers() {
      createFirebaseConnection();
      $log.log('getPlayers()');
      return players;
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
        $log.log('reset - players');
        players = null;
      }
    }
  }
})();
