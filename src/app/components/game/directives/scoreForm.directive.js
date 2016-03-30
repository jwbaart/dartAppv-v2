(function() {
    'use strict';

    angular
        .module('dartApp.game')
        .directive('drtScoreForm', drtScoreForm);

    /* @ngInject */
    function drtScoreForm() {
        var drtScoreForm = {
            restrict: 'EA',
            templateUrl: 'app/components/game/directives/scoreForm.html',
            scope: {
              scores: "=",
              gameKey: "="
            },
            controller: ScoreFormController,
            controllerAs: 'vm',
            bindToController: true
        };

        return drtScoreForm;
    }

    ScoreFormController.$inject = ['GamesService', '$log'];

    /* @ngInject */
    function ScoreFormController(GamesService, $log) {
        var vm = this;

        vm.addNewScore = addNewScore;
        vm.newScore = {};
        vm.oneTotal = 0;
        vm.twoTotal = 0;

        activate();

        function activate() {
          GamesService.getLastScoreOfgame(vm.gameKey).then(function(result) {
            result.one = '';
            result.two = '';
            vm.newScore = result;
          });
        }

        function addNewScore () {
          // Validate input
          if (angular.isNumber(vm.newScore.one) && angular.isNumber(vm.newScore.two)) {

              GamesService.addScoreByGame(vm.newScore, vm.gameKey).then(function (newScore) {
                vm.newScore = newScore;
              }, function() {

              });
          } else {
            $log.log('error');
            //TODO: Generate error message
          }
        }
    }
})();
