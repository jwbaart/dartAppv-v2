(function () {
    'use strict';

    angular
        .module('dartApp.core')
        .factory('PlayersService', PlayersService);

    PlayersService.$inject = ['$firebaseObject', 'firebaseDataService', 'GamesService'];

    function PlayersService($firebaseObject, firebaseDataService, GamesService) {
        var players = $firebaseObject(firebaseDataService.players);

        function Player(name, expires, active, uid) {
          this.name = name || '';
          this.expires = expires || '';
          this.active = active || false;
          this.uid = uid || '';
        }

        var services = {
          players : players,
          addPlayer: addPlayer,
          removePlayer: removePlayer,
          getPlayer: getPlayer
        }

        return services;

        ////////////////

        function addPlayer(authData) {
          var newPlayer = new Player(authData[authData.provider].displayName, authData.expires, true, authData.uid);

          players[newPlayer.uid] = newPlayer;
          players.$save().then(function(result) {
            console.log('Activated player: ' + newPlayer.uid);
            //GamesService.watchInvitations();
          }, function(error) {

          });
        }

        function removePlayer(authData) {
          players[authData.uid].active = false;
          players.$save().then(function(result) {
            console.log('Deactivated player: ' + authData.uid);
          }, function(error) {

          });;
        }

        function getPlayer(uid) {
          return players[uid];
        }
    }
})();
