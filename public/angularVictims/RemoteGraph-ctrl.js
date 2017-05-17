
angular.module("SOS08ManagerApp").
controller("VictimsRemoteGraphCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

    if (!$rootScope.apikey) $rootScope.apikey = "hf5HF86KvZ";

    $scope.refresh = function() {
        $http
            .get("../api/v1/victims" + "?" + "apikey=" + $rootScope.apikey)
            .then(function(response) {
                //$scope.debug = "";

                var years = [];
                var provinces = [];
                var countriesForeign = [];
                var provincesData = [];
                var countriesDataForeign = [];

                $http
                    .get("https://sos1617-03.herokuapp.com/api/v1/results/?apikey=apisupersecreta")
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
                                type: "area",
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
                                    e.data[years.indexOf(Number(d.year))] = Number(d['numberVictims']);
                                }
                            });
                        });

                        response_foreign.data.forEach(function(d) {
                            countriesDataForeign.forEach(function(e) {
                                if (d.country === e.name) {
                                    e.data[years.indexOf(Number(d.year))] = Number(d['math']);
                                }
                            });
                        });

                       
                        var hc = {
                            chart: {
                                zoomType: 'xy'
                            },
                            title: {
                                text: 'G08 & G03'
                            },
                            xAxis: {
                                categories: [],
                                crosshair: true
                            },
                            yAxis: [{ 
                                labels: {
                                    format: '{value}',
                                    style: {
                                        color: Highcharts.getOptions().colors[6]
                                    }
                                },
                                title: {
                                    text: 'Number of Victims',
                                    style: {
                                        color: Highcharts.getOptions().colors[6]
                                    }
                                }

                            }, { 
                                gridLineWidth: 0,
                                title: {
                                    text: 'Analysis of Education',
                                    style: {
                                        color: Highcharts.getOptions().colors[3]
                                    }
                                },
                                labels: {
                                    format: '{value}',
                                    style: {
                                        color: Highcharts.getOptions().colors[3]
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
