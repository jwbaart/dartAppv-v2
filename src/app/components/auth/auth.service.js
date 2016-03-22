(function() {
    'use strict';

    angular
        .module('dartApp.auth')
        .service('AuthService', AuthService);

    // AuthService.$inject = ['$scope', '$firebaseAuth', 'firebaseDataService'];
    AuthService.$inject = ['$firebaseAuth', 'firebaseDataService', '$firebaseObject', 'PlayersService'];

    /* @ngInject */
    function AuthService($firebaseAuth, firebaseDataService, $firebaseObject, PlayersService) {
    //function AuthService($scope, $firebaseAuth, firebaseDataService) {
        var ref = firebaseDataService.root,
            firebaseAuthObject = $firebaseAuth(ref),
            authData = {},
            players = $firebaseObject(firebaseDataService.players);

        var service = {
          login: login,
          logout: logout,
          isLoggedIn: isLoggedIn,
          getAuth: getAuth
        };

        return service;

        ///////////////

        function login(provider) {

          switch (provider) {
            case 'google':
              return loginGoogle();
              break
            default:
              console.log('Error: Login provider not found');
          }

        }

        function loginGoogle() {
          return ref.authWithOAuthPopup("google").then(function(authData) {
            PlayersService.addPlayer(authData);
            return Promise.resolve(authData);
          }, function(error) {
            return Promise.reject(error);
          })
        }

        function isLoggedIn() {
          // TODO: if logging, function is called multiple times...
          //return firebaseAuthObject.$getAuth() !== null;

          return firebaseAuthObject.$requireAuth();
        }

        function getAuth() {
          return firebaseAuthObject.$getAuth();
        }

        function logout() {
          PlayersService.removePlayer(getAuth());
          firebaseAuthObject.$unauth();
        }

    }
})();
