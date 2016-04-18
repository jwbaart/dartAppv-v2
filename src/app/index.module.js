(function() {
  'use strict';

  angular
    .module('dartApp', [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ngResource',
      'ngRoute',

      // Third-party modules
      'firebase',
      'ui.bootstrap',

      // Own modules
      'dartApp.core',
      'dartApp.auth',
      'dartApp.layout',
      'dartApp.game',
      'dartApp.admin'
    ]);

})();
