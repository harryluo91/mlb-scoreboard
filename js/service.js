var scoreboardService = angular.module('scoreboardService', ['ngResource']);

scoreboardService.factory('getScore', ['$resource',
    function($resource) {
        return $resource('http://gd2.mlb.com/components/game/mlb/year_:yearNum/month_:monthNum/day_:dayNum/master_scoreboard.json', {}, {
            get: {
                method: 'GET',
                params: {
                    year: '@yearNum',
                    month: '@monthNum',
                    day: '@dayNum'
                }
            }
        });
    }
]);