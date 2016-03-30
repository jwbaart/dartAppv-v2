(function() {
    'use strict';

    angular
        .module('dartApp.game')
        .directive('drtScoreTable', drtScoreTable);

    /* @ngInject */
    function drtScoreTable() {
        var drtScoreTable = {
            restrict: 'EA',
            templateUrl: 'app/components/game/directives/scoreTable.html',
            scope: {
              playerOne: '=',
              playerTwo: '=',
              scores: '=',
              gameKey: "="
            },
            controller: scoreTableController,
            controllerAs: 'vm',
            bindToController: true
        };

        return drtScoreTable;
    }

    scoreTableController.$inject = [];

    /* @ngInject */
    function scoreTableController() {
        // var vm = this;
        //
        // activate();
        //
        // function activate() {
        //
        // }
    }
})();
