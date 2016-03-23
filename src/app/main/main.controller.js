(function() {
  'use strict';

  angular
    .module('dartApp')
    .controller('MainController', MainController);

  MainController.$inject = ['AuthService', '$location', '$log'];

  /** @ngInject */
  function MainController(AuthService, $location, $log) {
    var vm = this;

    vm.isLoggedIn = AuthService.getAuth;
    vm.login = login;

    activate();

    function activate() {
    }

    function login(provider) {
      $log.log('login()');
      AuthService.login(provider).then(function(authData) {
        $location.path('#/game');
      }, function(error) {
        // TODO: Inform user
      });
    }
  }
})();
