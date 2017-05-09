/* global angular */
/* global Materialize */
/* global $ */
/* global google */
/* global Highcharts */

angular.module("SOS08ManagerApp").
controller("WagesGraphCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized");

    if (!$rootScope.apikey) $rootScope.apikey = "hf5HF86KvZ";

    $scope.refresh = function() {
        $http
            .get("../api/v1/wages" + "?" + "apikey=" + $rootScope.apikey)
            .then(function(response) {

                var years = [];
                var provinces = [];

                response.data.forEach(function(d) {
                    if (years.indexOf(Number(d.year)) == -1) years.push(Number(d.year));
                    if (provinces.indexOf(d.province) == -1) provinces.push(d.province);
                });
                years.sort((a, b) => a - b);

                var provincesData = [];

                provinces.forEach(function(d) {
                    var c = {
                        name: d,
                        data: []
                    };
                    years.forEach(function(e) {
                        c.data.push(0);
                    });
                    provincesData.push(c);
                });

                response.data.forEach(function(d) {
                    provincesData.forEach(function(e) {
                        if (d.province === e.name) {
                            e.data[years.indexOf(Number(d.year))] = Number(d['varied']);
                        }
                    });
                });

                // HighCharts
                var hc = {
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Wage Varied'
                    },
                    xAxis: {
                        categories: [],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: 'Varied Wages'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f}%</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: []
                };

                hc.xAxis.categories = years;
                hc.series = provincesData;

                Highcharts.chart('hc_column', hc);

                // Google Charts - Geochart
                google.charts.load('current', {
                    'packages': ['controls', 'geochart']
                });
                google.charts.setOnLoadCallback(drawRegionsMap);

                function drawRegionsMap() {
                    var chartData = [
                        ['province', 'averageWage', 'year']
                    ];

                    response.data.forEach(function(x) {
                        chartData.push([x.province, Number(x['averageWage']), Number(x.year)]);
                    });

                    var data = google.visualization.arrayToDataTable(chartData);

                    var options = {
                        colorAxis: {
                            colors: ['blue', 'yellow', 'pink']
                        }
                    };

                    var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard'));

                    var yearSelector = new google.visualization.ControlWrapper({
                        controlType: 'CategoryFilter',
                        containerId: 'filter',
                        options: {
                            filterColumnIndex: 2,
                            ui: {
                                allowTyping: false,
                                allowMultiple: false,
                                allowNone: false
                            }
                        }
                    });

                    var chart = new google.visualization.ChartWrapper({
                        chartType: 'GeoChart',
                        containerId: 'map',
                        options: {
                            colorAxis: {
                                colors: ['blue', 'pink', 'green']
                            }
                        }
                    });

                    dashboard.bind(yearSelector, chart);
                    dashboard.draw(data, options);
                }

                //Angular-Chart
                $scope.labels = years;
                $scope.series = provinces;
                $scope.data = [];
                provincesData.forEach(function(e) {
                    $scope.data.push(e.data);
                });
                $scope.datasetOverride = [{
                    yAxisID: 'y-axis-1'
                }];
                $scope.options = {
                    scales: {
                        yAxes: [{
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        }]
                    }
                };

            }, function(response) {
                switch (response.status) {
                    case 401:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key missing!', 4000);
                        break;
                    case 403:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key incorrect!', 4000);
                        break;
                    case 404:
                        Materialize.toast('<i class="material-icons">error_outline</i> No data found!', 4000);
                        break;
                    default:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data!', 4000);
                        break;
                }
            });
    };

    $scope.refresh();

}]);
