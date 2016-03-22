(function() {
  'use strict';

  angular
    .module('dartApp.core')
    .run(runBlock);

  /** @ngInject */
  function runBlock(InvitationsService) {

    // Start watchingg for invitation
    InvitationsService.watchInvitations();
  }

})();
