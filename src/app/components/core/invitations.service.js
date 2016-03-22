(function() {
    'use strict';

    angular
        .module('dartApp.core')
        .factory('InvitationsService', InvitationsService);

    InvitationsService.$inject = ['$firebaseArray', 'firebaseDataService','AuthService', 'GamesService', '$location'];

    /* @ngInject */
    function InvitationsService($firebaseArray, firebaseDataService, AuthService, GamesService, $location) {
        var invitations = $firebaseArray(firebaseDataService.invitations);
        var authData = AuthService.getAuth();

        function Invitation(playerOne, playerTwo, gameRef) {
          this.playerOne = playerOne;
          this.playerTwo = playerTwo;
          this.gameRef = gameRef;
          this.creationDate = Date.now();
        }

        var service = {
            invitations: invitations,
            watchInvitations: watchInvitations,
            invitePlayer: invitePlayer
        };

        return service;

        ///////////////

        function watchInvitations() {
          invitations.$watch(function(event) {
            var invitation = invitations.$getRecord(event.key);

            // Check if new invitation is added and if it's for the current player
            if (event.event === 'child_added' && invitation.playerTwo === authData.uid) {
              console.log('Found invitation from: ' + invitation.playerOne);
              invitations.$remove(invitation).then(function(result) {
                // console.log('Removed invitation: ');
                // console.log(invitation);
              }, function(error) {
                console.log(error);
              });
            }
          })
        }

        function invitePlayer(opponentUid) {

          if (opponentUid == authData.uid) {
            console.log('newGame: Uid\'s are the same(' + opponentUid + ')');
          } else {

            GamesService.addGame(authData.uid, opponentUid).then(function(gameKey) {
              var invitation = new Invitation(authData.uid, opponentUid, gameKey);
              invitations.$add(invitation).then(function(result) {
                // console.log(result);
                // console.log('New invitation set with ' + authData.uid + ' against ' + opponentUid);
                console.log('http://localhost:3000/#/game/' + gameKey);
                $location.path('/#game/' + gameKey);
              });
            });
          }
        }

    }
})();
