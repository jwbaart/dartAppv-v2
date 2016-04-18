(function() {
    'use strict';

    angular
        .module('dartApp.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['$scope', 'AdminService'];

    /* @ngInject */
    function AdminController($scope, AdminService) {
        var vm = this,
            gameTypes = null;

        vm.addNewGameType = addNewGameType;
        vm.toggleGameTypeState = toggleGameTypeState;
        vm.getGameTypes = AdminService.getGameTypes;
        vm.updateGameType = AdminService.updateGameType;
        vm.removeGameType = AdminService.removeGameType;
        vm.newGameType = {};
        vm.newGameTypeForm = {};

        activate();

        /////////////////////

        function activate() {

        }

        function addNewGameType() {
          console.log('addNewGameType()');
          if (vm.newGameType.name && vm.newGameType.name.length) {
            vm.newGameType.active = true;
            AdminService.addGameType(vm.newGameType).then(function (data) {
              vm.newGameType = {};
              vm.newGameTypeForm.$setPristine();
            });
          } else {

          }
        }

        function toggleGameTypeState(gameType) {
          var gameTypeObj = AdminService.getGameType(gameType.$id);

          gameTypeObj.active = !gameTypeObj.active;

          AdminService.updateGameType(gameTypeObj)
        }
    }
})();
