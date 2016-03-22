(function() {
  'use strict';

  angular
    .module('dartAppV2')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
