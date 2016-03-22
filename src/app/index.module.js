(function() {
  'use strict';

  angular
    .module('dartApp', [
      //'ngAnimate',
      //'ngCookies',
      //'ngTouch',
      //'ngSanitize',
      //'ngMessages',
      //'ngAria',
      //'ngResource',
      'ngRoute',

      // Third-party modules
      'firebase',

      // Own modules
      'dartApp.core',
      'dartApp.auth',
      'dartApp.layout',
      'dartApp.game'
    ]);

})();
