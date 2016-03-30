(function() {
    'use strict';

    angular
        .module('dartApp.core')
        .factory('InvitationsService', InvitationsService);

    InvitationsService.$inject = ['$firebaseArray', 'firebaseDataService','AuthService', 'GamesService', '$log', 'HelperService'];

    /* @ngInject */
    function InvitationsService($firebaseArray, firebaseDataService, AuthService, GamesService, $log, HelperService) {
        var invitations = null;
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
            invitePlayer: invitePlayer,
            reset: reset
        };

        return service;

        ///////////////

        function watchInvitations() {
          createFirebaseConnection();

          invitations.$loaded(function () {
            invitations.$watch(function(event) {
              var invitation = invitations.$getRecord(event.key);

              // Check if new invitation is added and if it's for the current player
              if (event.event === 'child_added' && invitation.playerTwo === authData.uid) {
                $log.log('Found invitation from: ' + invitation.playerOne);
                HelperService.redirect('/game/' + invitation.gameRef);
                invitations.$remove(invitation).then(function() {
                }, function(error) {
                  $log.log(error);
                });
              }
            });
          });
        }

        function invitePlayer(opponentUid) {
          createFirebaseConnection();

          // console.log(AuthService.waitForAuth());
          //AuthService.waitForAuth(function (result) {
            // console.log(result);
            // console.log('waitForAuth succeeded');
            if (opponentUid == authData.uid) {
              $log.log('newGame: Uid\'s are the same(' + opponentUid + ')');
            } else {

              GamesService.addGame(authData.uid, opponentUid).then(function(gameKey) {
                var invitation = new Invitation(authData.uid, opponentUid, gameKey);
                invitations.$add(invitation).then(function() {
                  HelperService.redirect('/game/' + gameKey);
                });
              });
            }
          // }, function (error) {
          //   console.log(error);
          // });
        }

        function createFirebaseConnection() {
            if (!invitations) {
              $log.debug('createFirebaseConnection - invitations');
              invitations = $firebaseArray(firebaseDataService.invitations);
            }
        }

        function reset() {
          if (invitations) {
            invitations.$destroy();
            $log.log('reset - invitations');
            invitations = null;
          }
        }

    }
})();
