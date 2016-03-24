(function() {
    'use strict';

    angular
        .module('dartApp.core')
        .factory('HelperService', HelperService);

    HelperService.$inject = ['$location', '$timeout'];

    /* @ngInject */
    function HelperService($location, $timeout) {
        var service = {
            redirect: redirect
        };

        return service;

        function redirect(path) {
          $timeout(function () {
              $location.path(path);
          });
        }
    }
})();
