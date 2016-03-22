(function() {
    'use strict';

    angular
        .module('dartApp.layout')
        .directive('drtNavbar', drtNavbar);

    /* @ngInject */
    function drtNavbar() {
        var drtNavbar = {
            restrict: 'EA',
            templateUrl: 'app/components/layout/navbar.html',
            scope: {
            },
            link: linkFunc,
            controller: drtNavbarController,
            controllerAs: 'vm',
            bindToController: true
        };

        return drtNavbar;

        function linkFunc(scope, el, attr, ctrl) {

        }
    }

    drtNavbarController.$inject = ['AuthService', '$location', 'GamesService'];

    /* @ngInject */
    function drtNavbarController(AuthService, $location, GamesService) {
        var vm = this;

        vm.login = login;
        vm.logout = logout;
        vm.isLoggedIn = AuthService.getAuth;
        //vm.activeGame - GamesService.activeGame;
        vm.activeGame = activeGame;

        function login(provider) {
          AuthService.login(provider).then(function(authData) {
            $location.path('#/game');
          }, function(error) {
            // TODO: Inform user
          });
        }

        function activeGame() {
          var authData = AuthService.getAuth(),
              result = '';

          if (authData) {
            result = '/' + GamesService.activeGame(authData.uid);
          }

          return result;
        }

        function logout() {
            AuthService.logout();
            $location.path('/');
        }
    }
})();
