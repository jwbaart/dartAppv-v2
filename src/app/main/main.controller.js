(function() {
  'use strict';

  angular
    .module('dartApp')
    .controller('MainController', MainController);

  MainController.$inject = ['AuthService'];

  /** @ngInject */
  function MainController(AuthService) {
    var vm = this;

    vm.isLoggedIn = AuthService.getAuth;

    activate();

    function activate() {

    }

  }
})();
