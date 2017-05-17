
angular.module("SOS08ManagerApp").
controller("WagesProxyGraphCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

    if (!$rootScope.apikey) $rootScope.apikey = "hf5HF86KvZ";

    $scope.refresh = function() {
        $http
            .get("../api/v1/wages" + "?" + "apikey=" + $rootScope.apikey)
            .then(function(response) {
                //$scope.debug = "";

                var years = [];
                var provinces = [];
                var provincesG04 = [];
                var provincesData = [];
                var provincesDataG04 = [];

                $http
                    .get("../proxy/wages")
                    .then(function(res_G04) {

                        response.data.forEach(function(d) {
                            if (years.indexOf(Number(d.year)) == -1) years.push(Number(d.year));
                            if (provinces.indexOf(d.province) == -1) provinces.push(d.province);
                        });

                        res_G04.data.forEach(function(d) {
                            if (years.indexOf(Number(d.year)) == -1) years.push(Number(d.year));
<<<<<<< HEAD
                            if (provincesForeign.indexOf(d.country) == -1) provincesForeign.push(d.country);
=======
                            if (provincesG04.indexOf(d.province) == -1) provincesG04.push(d.province);
>>>>>>> c238563e4e819052d92b83d08128a6b8bb517ed2
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

                        provincesG04.forEach(function(d) {
                            var c = {
                                name: d,
                                type: "areaspline",
                                yAxis: 1,
                                data: []
                            };
                            years.forEach(function(e) {
                                c.data.push(0);
                            });
                            provincesDataG04.push(c);
                        });

                        response.data.forEach(function(d) {
                            provincesData.forEach(function(e) {
                                if (d.province === e.name) {
                                    e.data[years.indexOf(Number(d.year))] = Number(d['varied']);
                                }
                            });
                        });

                        res_G04.data.forEach(function(d) {
                            provincesDataG04.forEach(function(e) {
                                if (d.province === e.name) {
                                    e.data[years.indexOf(Number(d.year))] = Number(d['oil']);
                                }
                            });
                        });

                     
                        var chartRoberto = {
                            chart: {
                                zoomType: 'xy'
                            },
                            title: {
                                text: 'G04 & G08'
                            },
                            xAxis: {
                                categories: [],
                                crosshair: true
                            },
                            yAxis: [{ 
                                labels: {
                                    format: '{value} %',
                                    style: {
                                        color: Highcharts.getOptions().colors[3]
                                    }
                                },
                                title: {
                                    text: 'Wages Varied (%)',
                                    style: {
                                        color: Highcharts.getOptions().colors[4]
                                    }
                                }

                            }, { 
                                gridLineWidth: 0,
                                title: {
                                    text: 'Oil',
                                    style: {
                                        color: Highcharts.getOptions().colors[2]
                                    }
                                },
                                labels: {
                                    format: '{value}',
                                    style: {
                                        color: Highcharts.getOptions().colors[2]
                                    }
                                },
                                opposite: true
                            }],
                            tooltip: {
                                shared: true
                            },
                            plotOptions: {
                                column: {
                                    stacking: 'normal'
                                }
                            },
                            series: []
                        };
                        
                        chartRoberto.xAxis.categories = years;
                        chartRoberto.series = provincesData.concat(provincesDataG04);

                        Highcharts.chart('hc_column', chartRoberto);

                    });

            });
    };

    $scope.refresh();

}]);
