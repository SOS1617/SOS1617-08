
angular.module("SOS08ManagerApp").
controller("WagesRemoteGraphCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

    if (!$rootScope.apikey) $rootScope.apikey = "hf5HF86KvZ";

    $scope.refresh = function() {
        $http
            .get("../api/v1/wages" + "?" + "apikey=" + $rootScope.apikey)
            .then(function(response) {

                var years = [];
                
                var provinces = [];
                
                var countriesG07 = [];
                
                
                var provincesData = [];
                
                var countriesDataG07 = [];

                $http
                    .get("https://sos1617-07.herokuapp.com/api/v1/investEducationStats/?apikey=sos07")
                    .then(function(res_G07) {

                        response.data.forEach(function(d) {
                            if (years.indexOf(Number(d.year)) == -1) years.push(Number(d.year));
                            if (provinces.indexOf(d.province) == -1) provinces.push(d.province);
                        });

                        res_G07.data.forEach(function(d) {
                            if (years.indexOf(Number(d.year)) == -1) years.push(Number(d.year));
                            if (countriesG07.indexOf(d.country) == -1) countriesG07.push(d.country);
                        });

                        years.sort((a, b) => a - b);

                        provinces.forEach(function(d) {
                            var b = {
                                name: d,
                                type: "spline",
                                yAxis: 0,
                                data: []
                            };
                            years.forEach(function(e) {
                                b.data.push(0);
                            });
                            provincesData.push(b);
                        });

                        countriesG07.forEach(function(d) {
                            var c = {
                                name: d,
                                type: "areaspline",
                                yAxis: 1,
                                data: []
                            };
                            years.forEach(function(e) {
                                c.data.push(0);
                            });
                            countriesDataG07.push(c);
                        });

                        response.data.forEach(function(d) {
                            provincesData.forEach(function(e) {
                                if (d.province === e.name) {
                                    e.data[years.indexOf(Number(d.year))] = Number(d['varied']);
                                }
                            });
                        });

                        res_G07.data.forEach(function(d) {
                            countriesDataG07.forEach(function(e) {
                                if (d.country === e.name) {
                                    e.data[years.indexOf(Number(d.year))] = Number(d['investEducationStat']);
                                }
                            });
                        });

                       
                        var chartRoberto = {
                            chart: {
                                zoomType: 'xy'
                            },
                            title: {
                                text: 'G08 & G07'
                            },
                            xAxis: {
                                categories: [],
                                crosshair: true
                            },
                            yAxis: [{ 
                                labels: {
                                    format: '{value} %',
                                    style: {
                                        color: Highcharts.getOptions().colors[6]
                                    }
                                },
                                title: {
                                    text: 'varied (%)',
                                    style: {
                                        color: Highcharts.getOptions().colors[6]
                                    }
                                }

                            }, { 
                                gridLineWidth: 0,
                                title: {
                                    text: 'Investment in education',
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
                        
                        chartRoberto.xAxis.categories = years;
                        chartRoberto.series = provincesData.concat(countriesDataG07);

                        Highcharts.chart('hc_column', chartRoberto);

                    });

            });
    };

    $scope.refresh();

}]);
