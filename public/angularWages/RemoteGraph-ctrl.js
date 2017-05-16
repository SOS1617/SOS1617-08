
angular.module("SOS08ManagerApp").
controller("WagesRemoteGraphCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

    if (!$rootScope.apikey) $rootScope.apikey = "hf5HF86KvZ";

    $scope.refresh = function() {
        $http
            .get("../api/v1/wages" + "?" + "apikey=" + $rootScope.apikey)
            .then(function(response) {
                //$scope.debug = "";

                var years = [];
                var provinces = [];
                var countriesForeign = [];
                var provincesData = [];
                var countriesDataForeign = [];

                $http
                    .get("https://sos1617-07.herokuapp.com/api/v1/investEducationStats/?apikey=sos07")
                    .then(function(response_foreign) {

                        response.data.forEach(function(d) {
                            if (years.indexOf(Number(d.year)) == -1) years.push(Number(d.year));
                            if (provinces.indexOf(d.province) == -1) provinces.push(d.province);
                        });

                        response_foreign.data.forEach(function(d) {
                            if (years.indexOf(Number(d.year)) == -1) years.push(Number(d.year));
                            if (countriesForeign.indexOf(d.country) == -1) countriesForeign.push(d.country);
                        });

                        years.sort((a, b) => a - b);

                        provinces.forEach(function(d) {
                            var b = {
                                name: d,
                                type: "line",
                                yAxis: 0,
                                data: []
                            };
                            years.forEach(function(e) {
                                b.data.push(0);
                            });
                            provincesData.push(b);
                        });

                        countriesForeign.forEach(function(d) {
                            var c = {
                                name: d,
                                type: "column",
                                yAxis: 1,
                                data: []
                            };
                            years.forEach(function(e) {
                                c.data.push(0);
                            });
                            countriesDataForeign.push(c);
                        });

                        response.data.forEach(function(d) {
                            provincesData.forEach(function(e) {
                                if (d.province === e.name) {
                                    e.data[years.indexOf(Number(d.year))] = Number(d['varied']);
                                }
                            });
                        });

                        response_foreign.data.forEach(function(d) {
                            countriesDataForeign.forEach(function(e) {
                                if (d.country === e.name) {
                                    e.data[years.indexOf(Number(d.year))] = Number(d['investEducationStat']);
                                }
                            });
                        });

                       
                        var hc = {
                            chart: {
                                zoomType: 'xy'
                            },
                            title: {
                                text: 'Spending on education and the level of start-ups'
                            },
                            xAxis: {
                                categories: [],
                                crosshair: true
                            },
                            yAxis: [{ // Primary yAxis
                                labels: {
                                    format: '{value} %',
                                    style: {
                                        color: Highcharts.getOptions().colors[1]
                                    }
                                },
                                title: {
                                    text: 'GDP (%)',
                                    style: {
                                        color: Highcharts.getOptions().colors[1]
                                    }
                                }

                            }, { // Secondary yAxis
                                gridLineWidth: 0,
                                title: {
                                    text: 'The level of start-ups',
                                    style: {
                                        color: Highcharts.getOptions().colors[0]
                                    }
                                },
                                labels: {
                                    format: '{value}',
                                    style: {
                                        color: Highcharts.getOptions().colors[0]
                                    }
                                },
                                opposite: true
                            }],
                            tooltip: {
                                shared: true
                            },
                            series: []
                        };
                        
                        hc.xAxis.categories = years;
                        hc.series = provincesData.concat(countriesDataForeign);

                        Highcharts.chart('hc_column', hc);

                    });

            });
    };

    $scope.refresh();

}]);
