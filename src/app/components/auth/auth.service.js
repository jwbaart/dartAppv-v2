(function() {
    'use strict';

    angular
        .module('dartApp.auth')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$firebaseAuth', 'firebaseDataService', '$firebaseObject', 'PlayersService', '$log'];

    /* @ngInject */
    function AuthService($firebaseAuth, firebaseDataService, $firebaseObject, PlayersService, $log) {
        var ref = firebaseDataService.root,
            firebaseAuthObject = $firebaseAuth(ref);

        var service = {
          login: login,
          logout: logout,
          isLoggedIn: firebaseAuthObject.$requireAuth,
          getAuth: getAuth,
          waitForAuth: waitForAuth
        };

        return service;

        ///////////////

        function login(provider) {

          switch (provider) {
            case 'google':
              return loginGoogle();
            default:
              $log.log('Error: Login provider not found');
          }

        }

        function loginGoogle() {
          return ref.authWithOAuthPopup("google").then(function(authData) {
            return Promise.resolve(authData);
          }, function(error) {
            return Promise.reject(error);
          })
        }

        function getAuth() {
          return firebaseAuthObject.$getAuth();
        }

        function logout() {
          firebaseAuthObject.$unauth();
        }

        function waitForAuth() {
          return firebaseAuthObject.$waitForAuth();
        }

    }
})();
