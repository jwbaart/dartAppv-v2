(function () {
  'use strict';

  angular
    .module('dartApp.game')
    .config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
      $routeProvider.when('/game', {
        templateUrl: 'app/components/game/game.html',
        controller: 'GameController',
        controllerAs: 'vm',
        resolve: {user: resolveUser}
      }).when('/game/:gameKey', {
        templateUrl: 'app/components/game/game.html',
        controller: 'GameController',
        controllerAs: 'vm',
        resolve: {user: resolveUser}
      }).when('/new-game', {
        templateUrl: 'app/components/game/newGame.html',
        controller: 'GameController',
        controllerAs: 'vm',
        resolve: {user: resolveUser}
      });

      resolveUser.$inject = ['AuthService'];

      function resolveUser(AuthService) {
        return AuthService.isLoggedIn();
      }
    }
})()
