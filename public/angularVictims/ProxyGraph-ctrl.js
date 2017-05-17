
angular.module("SOS08ManagerApp").
controller("VictimsProxyGraphCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

    if (!$rootScope.apikey) $rootScope.apikey = "hf5HF86KvZ";

    $scope.refresh = function() {
        $http
            .get("../api/v1/victims" + "?" + "apikey=" + $rootScope.apikey)
            .then(function(response) {
                //$scope.debug = "";

                var years = [];
                var provinces = [];
                var provincesForeign = [];
                var provincesData = [];
                var provincesDataForeign = [];

                $http
                    .get("../proxy/victims")
                    .then(function(response_foreign) {

                        response.data.forEach(function(d) {
                            if (years.indexOf(Number(d.year)) == -1) years.push(Number(d.year));
                            if (provinces.indexOf(d.province) == -1) provinces.push(d.province);
                        });

                        response_foreign.data.forEach(function(d) {
                            if (years.indexOf(Number(d.year)) == -1) years.push(Number(d.year));
                            if (provincesForeign.indexOf(d.country) == -1) provincesForeign.push(d.country);
                        });

                        years.sort((a, b) => a - b);

                        provinces.forEach(function(d) {
                            var b = {
                                name: d,
                                
                                yAxis: 0,
                                data: []
                            };
                            years.forEach(function(e) {
                                b.data.push(0);
                            });
                            provincesData.push(b);
                        });

                        provincesForeign.forEach(function(d) {
                            var c = {
                                name: d,
                                type: "area",
                                yAxis: 1,
                                data: []
                            };
                            years.forEach(function(e) {
                                c.data.push(0);
                            });
                            provincesDataForeign.push(c);
                        });

                        response.data.forEach(function(d) {
                            provincesData.forEach(function(e) {
                                if (d.province === e.name) {
                                    e.data[years.indexOf(Number(d.year))] = Number(d['numberVictims']);
                                }
                            });
                        });

                        response_foreign.data.forEach(function(d) {
                            provincesDataForeign.forEach(function(e) {
                                if (d.province === e.name) {
                                    e.data[years.indexOf(Number(d.year))] = Number(d['smi-year']);
                                }
                            });
                        });

                     
                        var hc = {
                            chart: {
                                zoomType: 'xy'
                            },
                            title: {
                                text: 'G02 & G08'
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
                                    text: 'Number of Victims',
                                    style: {
                                        color: Highcharts.getOptions().colors[4]
                                    }
                                }

                            }, { 
                                gridLineWidth: 0,
                                title: {
                                    text: 'smi-year',
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
                        
                        hc.xAxis.categories = years;
                        hc.series = provincesData.concat(provincesDataForeign);

                        Highcharts.chart('hc_column', hc);

                    });

            });
    };

    $scope.refresh();

}]);
