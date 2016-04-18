(function() {
    'use strict';

    angular
        .module('dartApp.auth')
        .service('AuthService', AuthService);

    AuthService.$inject = ['$firebaseAuth', 'firebaseDataService', '$firebaseObject', '$log'];

    /* @ngInject */
    function AuthService($firebaseAuth, firebaseDataService, $firebaseObject, $log) {
        var ref = firebaseDataService.root,
            firebaseAuthObject = $firebaseAuth(ref),
            authData = null;

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
          return ref.authWithOAuthPopup("google").then(function(firebaseAuthData) {
            authData = firebaseAuthData;
            return Promise.resolve(authData);
          }, function(error) {
            return Promise.reject(error);
          })
        }

        function getAuth() {
          if (authData === null) {
            authData = firebaseAuthObject.$getAuth();
          }

          return authData;
        }

        function logout() {
          authData = null;
          firebaseAuthObject.$unauth();
        }

        function waitForAuth() {
          return firebaseAuthObject.$waitForAuth();
        }

    }
})();
