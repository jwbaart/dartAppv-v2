(function() {
  'use strict';

  angular
    .module('dartApp.admin')
    .factory('AdminService', AdminService);

  AdminService.$inject = ['$log', '$firebaseArray', 'firebaseDataService'];

  /* @ngInject */
  function AdminService($log, $firebaseArray, firebaseDataService) {

    var gameTypes = null;

    var service = {
      getGameTypes: getGameTypes,
      getGameType: getGameType,
      addGameType: addGameType,
      updateGameType: updateGameType,
      removeGameType: removeGameType,
      reset: reset
    };

    return service;

    ///////////////

    function getGameTypes() {
      createFirebaseConnection();

      return gameTypes;
    }

    function getGameType(gameTypeId) {
      createFirebaseConnection();

      return gameTypes.$getRecord(gameTypeId)
    }

    function addGameType(gameType) {
      createFirebaseConnection();

      return gameTypes.$add(gameType);
    }

    function updateGameType(gameType) {
      createFirebaseConnection();

      gameTypes.$save(gameType);
    }

    function removeGameType(gameType) {
      createFirebaseConnection();

      gameTypes.$remove(gameType);
    }

    function createFirebaseConnection() {
      if (!gameTypes) {
        gameTypes = $firebaseArray(firebaseDataService.gameTypes);
      }
    }

    function reset() {
      if (gameTypes) {
        gameTypes.$destroy();
        $log.log('reset - admin');
        gameTypes = null;
      }
    }
  }
})();
