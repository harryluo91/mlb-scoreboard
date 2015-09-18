'use strict';

var mlbApp = angular.module('mlbApp', ['scoreboardService']);

mlbApp.controller('scoreboardController', ['$scope', 'getScore',

    function($scope, getScore) {
        $scope.parseInt = parseInt;
        /* The function that updates the scoreboards */
        var updateScore = function(response) {
            var gameData = [];
            if (Array.isArray(response.data.games.game)) {
                for (var i = 0; i < response.data.games.game.length; i++) {
                    if (response.data.games.game[i].home_team_id == 141 || response.data.games.game[i].away_team_id == 141) {
                        gameData.unshift(response.data.games.game[i]);
                    } else {
                        gameData.push(response.data.games.game[i]);
                    }
                }
            } else {
                gameData = [response.data.games.game];
            }
            return gameData;
        }

        /* initialize the jQuery calender plugin */
        $("#datepicker").datepicker({
            /* Update the scoreboard whenever a new date is selected */
            onSelect() {
                var currentDay = new Date($("#datepicker").datepicker("getDate"));
                getScore.get({
                    yearNum: $("#datepicker").datepicker("getDate").getFullYear(),
                    monthNum: ("0" + ($("#datepicker").datepicker("getDate").getMonth() + 1)).slice(-2),
                    dayNum: ("0" + $("#datepicker").datepicker("getDate").getDate()).slice(-2)
                }, function(res) {
                    $scope.scoreboards = updateScore(res);
                }, function() {
                    $('.server-message').attr("style", "display: block");
                });
            }
        });

        /* set the default to today */
        $("#datepicker").datepicker("setDate", (new Date()).toLocaleDateString('en-US'));
        var today = new Date();
        getScore.get({
            yearNum: today.getFullYear(),
            monthNum: ("0" + (today.getMonth() + 1)).slice(-2),
            dayNum: ("0" + today.getDate()).slice(-2)
        }, function(res) {
            $scope.scoreboards = updateScore(res);
        }, function() {
            $('.server-message').attr("style", "display: block");
        });


        /* event handler for choosing previous day */
        $scope.prevDate = function() {
            var prevDay = (new Date($("#datepicker").datepicker("getDate").getTime() - 86400000)).toLocaleDateString('en-US');
            $("#datepicker").datepicker("setDate", prevDay);
            getScore.get({
                yearNum: $("#datepicker").datepicker("getDate").getFullYear(),
                monthNum: ("0" + ($("#datepicker").datepicker("getDate").getMonth() + 1)).slice(-2),
                dayNum: ("0" + $("#datepicker").datepicker("getDate").getDate()).slice(-2)
            }, function(res) {
                $scope.scoreboards = updateScore(res);
            }, function() {
                $('.server-message').attr("style", "display: block");
            });
        };

        /* event handler for choosing next day */
        $scope.nextDate = function() {
            var nextDay = (new Date($("#datepicker").datepicker("getDate").getTime() + 86400000)).toLocaleDateString('en-US');
            $("#datepicker").datepicker("setDate", nextDay);
            getScore.get({
                yearNum: $("#datepicker").datepicker("getDate").getFullYear(),
                monthNum: ("0" + ($("#datepicker").datepicker("getDate").getMonth() + 1)).slice(-2),
                dayNum: ("0" + $("#datepicker").datepicker("getDate").getDate()).slice(-2)
            }, function(res) {
                $scope.scoreboards = updateScore(res);
            }, function() {
                $('.server-message').attr("style", "display: block");
            });
        };
    }
]);