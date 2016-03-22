(function() {
  'use strict';

  angular
    .module('dartApp')
    .controller('MainController', MainController);

  MainController.$inject = ['AuthService', '$location'];

  /** @ngInject */
  function MainController(AuthService, $location) {
    var vm = this;

    vm.isLoggedIn = AuthService.getAuth;
    vm.login = login;

    activate();

    function activate() {
    }

    function login(provider) {
      console.log('login()');
      AuthService.login(provider).then(function(authData) {
        $location.path('#/game');
      }, function(error) {
        // TODO: Inform user
      });
    }
  }
})();
