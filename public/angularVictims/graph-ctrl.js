angular.module("SOS08ManagerApp")
    .controller("VictimsGraphCtrl", ["$scope", "$http", function($scope, $http) {

        $scope.apikey = "hf5HF86KvZ";
        $scope.data = {};
        var dataCache = {};
        $scope.datos = [];
        $scope.numberVictims = [];
        $scope.averageYears = [];
        $scope.year = [];
        $scope.province = [];
        $scope.res = [];


        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        $http.get("/api/v1/victims/" + "?" + "apikey=" + $scope.apikey).then(function(response) {

            dataCache = response.data;
            $scope.data = dataCache;

            for (var i = 0; i < response.data.length; i++) {
                $scope.datos.push(capitalizeFirstLetter($scope.data[i].province) + " " + $scope.data[i].year);
                $scope.numberVictims.push(Number($scope.data[i].numberVictims));
                $scope.averageYears.push(Number($scope.data[i].averageYears));
                $scope.year.push(Number($scope.data[i].year));
                $scope.province.push(($scope.data[i].province));

                //$scope.res.push({ label: $scope.data[i].year, y: $scope.data[i].numberVictims});

                console.log($scope.data[i].province);
            }
            for (var i = 0; i < response.data.length; i++) {

                $scope.res.push({
                    label: '"' + $scope.province[i] + '"',
                    y: $scope.numberVictims[i]
                });
                console.log("res actual: " + $scope.res[i]);
            }
            console.log("RES: " + $scope.res);

        });

        console.log("Controller initialized");
        $http.get("/api/v1/victims/" + "?" + "apikey=" + $scope.apikey).then(function(response) {


            Highcharts.chart('container', {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Number of Victims per year'
                },
                xAxis: {
                    categories: $scope.year
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Ages / Number of Victims'
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    }
                },
                series: [{
                    name: 'numberVictims',
                    data: $scope.numberVictims
                }, {
                    name: 'AverageYears',
                    data: $scope.averageYears
                }]
            });



            //Google
            google.charts.load('current', {
                'packages': ['controls', 'geochart'],
                'mapsApiKey': 'AIzaSyBn5mCnx7CAij6MELDaLrPdidDdGDn0V50'
            });
            google.charts.setOnLoadCallback(drawRegionsMap);


            function drawRegionsMap() {
                var myData = [
                    ['Province', 'NumberVictims', 'Year']
                ];

                response.data.forEach(function(d) {
                    myData.push([capitalizeFirstLetter(d.province), Number(d.numberVictims), Number(d.year)]);
                });

                var data = google.visualization.arrayToDataTable(myData);
                var options = {

                    region: '150',
                    colorAxis: {
                        colors: ['blue', 'red', 'yellow']
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
                            allowMultiple: true,
                            allowNone: false
                        }
                    }
                });
                var chart = new google.visualization.ChartWrapper({
                    chartType: 'GeoChart',
                    containerId: 'map',
                    options: {
                        displayMode: 'regions',
                        colorAxis: {
                            colors: ['yellow', 'orange', 'red']
                        }
                    }
                });
                dashboard.bind(yearSelector, chart);
                dashboard.draw(data, options);
            }


            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                theme: "theme2",
                //exportEnabled: true,
                title: {
                    text: "Victims per City"
                },
                data: [{
                    type: "column",

                    dataPoints: $scope.res
                }]
            });

            chart.render();
        });






    }]);
