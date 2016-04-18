(function () {
  'use strict';

  angular
    .module('dartApp.admin')
    .config(configFunction);

    configFunction.$inject = ['$routeProvider'];

    function configFunction($routeProvider) {
      $routeProvider.when('/admin', {
        templateUrl: 'app/components/admin/admin.html',
        controller: 'AdminController',
        controllerAs: 'vm',
        resolve: {user: resolveUser}
      });

      resolveUser.$inject = ['AuthService', 'PlayersService'];

      function resolveUser(AuthService, PlayersService) {
        return AuthService.isLoggedIn() && PlayersService.isAdmin();
      }
    }
})();
