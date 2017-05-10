angular
    .module("SOS08ManagerApp")
    .controller("WagesGraphCtrl",["$scope","$http",function ($scope, $http){
        
        $scope.apikey = "hf5HF86KvZ";
        $scope.data = {};
        var dataCache = {};
        $scope.datos = [];
        $scope.varied = [];
        $scope.averageWage = [];
       $scope.year=[];
       $scope.province=[];
        
        function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
        
        $http.get("/api/v1/wages/"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            dataCache = response.data;
            $scope.data = dataCache;
            
            for(var i=0; i<response.data.length; i++){
                $scope.datos.push(capitalizeFirstLetter($scope.data[i].province) + " " + $scope.data[i].year);
                $scope.varied.push(Number($scope.data[i].varied));
                $scope.averageWage.push(Number($scope.data[i].averageWage));
                $scope.year.push(Number($scope.data[i].year));
                $scope.province.push(Number($scope.data[i].province));

                console.log($scope.data[i].province);
            }
        });    
            
        console.log("Controller initialized");
        $http.get("/api/v1/wages/"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            
           Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Wages Spain'
    },
    subtitle: {
        text: 'over Health and Military Expenditure'
    },
    xAxis: {
        categories: $scope.datos,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Wages Spain '
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
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
    series: [{
        name: 'varied',
        data: $scope.varied

    }, {
        name: 'averageWage',
        data: $scope.averageWage

    }]
});
            
            
        
            //Google
            google.charts.load('current', {
                'packages': ['controls','geochart'], mapsApiKey: "AIzaSyD3cwim5y4k5XplhEsTj_AuLYdu6rQHq2o"

            });
            google.charts.setOnLoadCallback(drawRegionsMap);
                        
        
            function drawRegionsMap() {
                var myData = [['Province','Varied', 'Year']];
     
                response.data.forEach(function (d){
                    myData.push([capitalizeFirstLetter(d.province), Number(d.varied), Number(d.year)]);
                });
                    
                var data = google.visualization.arrayToDataTable(myData);
                var options = {
                    region: '150',
                    colorAxis: {colors: ['yellow', 'orange' , 'red']}
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
                        colorAxis: {colors: ['purple', 'orange' , 'blue']}
                    }
                });
                dashboard.bind(yearSelector, chart);
                dashboard.draw(data, options);
            }    
            
          
    
  
  
  //Zing-Charts
            var myZingChart = {
                "type": "line",
                
                "backgroundColor":'#FCFCFB',
                "title": {
                    "text": "Wages in Spain",
                    "fontColor":"#FFFFF",
                    "font-size": "50px",
                    "adjust-layout": true
                },
                "plotarea": {
                    "margin": "dynamic 45 60 dynamic",
                },
                
                "legend": {
                    "layout": "float",
                    "background-color": "white",
                    "border-width": 0,
                    "shadow": 0,
                    "align": "center",
                    "adjust-layout": true,
                "item": {
                    "padding": 7,
                    "marginRight": 17,
                    "cursor": "hand"
                }
                },
                
                "scale-x": {
                    "label": {
                        "text": "Province and Year",
                        "fontColor":"#A6FF8F"   ,

                    },
                    "labels": 
                        $scope.datos
                    
                },
                "scale-y": {
                    "min-value": "0:1383292800000",
                    "label": {
                        "text": "Cuantity",
                        "fontColor":"#A6FF8F",

                    },
                    
                },
                
                "crosshair-x": {
                    "line-color": "#efefef",
                    "plot-label": {
                    "border-radius": "5px",
                    "border-width": "1px",
                    "border-color": "#0680FA",
                    "padding": "10px",
                    "font-weight": "bold"
                },
                "scale-label": {
                    "font-color": "#000",
                    "background-color": "#C133FF",
                    "border-radius": "10px"
                }
            },
                
                "tooltip": {
                    "visible": false
                },
                
                "plot": {
                    "highlight": true,
                    "tooltip-text": "%t views: %v<br>%k",
                    "shadow": 0,
                    "line-width": "4px",
                    "marker": {
                    "type": "square",
                    "size": 3
                },
                "highlight-state": {
                "line-width": 3
                },
                "animation": {
                    "effect": 3,
                    "sequence": 4,
                    "speed": 800,
                }
                },
                
                "series": [
                {
                    "values": $scope.varied,
                    "text": "varied in %",
                    "line-color": "#FF3333",
                    "legend-item":{
                      "background-color": "#FF3333",
                      "borderRadius":7,
                      "font-color":"black"
                    },
                    "legend-marker": {
                        "visible":false
                    },
                    "marker": {
                        "background-color": "#F0FF33",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69dbf1"
                    },
                    "highlight-marker":{
                      "size":6,
                      "background-color": "#F0FF33",
                    }
                },
                {
                    "values": $scope.averageWage,
                    "text": "averageWage per year",
                    "line-color": "#6EFF33",
                    "legend-item":{
                      "background-color": "#6EFF33",
                      "borderRadius":7,
                      "font-color":"black"
                    },
                    "legend-marker": {
                        "visible":false
                    },
                    "marker": {
                        "background-color": "#FEB32E",
                        "border-width": 1,
                        "shadow": 0,
                        "border-color": "#69f2d0"
                    },
                    "highlight-marker":{
                      "size":6,
                      "background-color": "#FEB32E",
                    }
                }
            ]
            };

            zingchart.render({
                id: 'RobertoChart',
                data: myZingChart,
                height: '100%',
                width: '85%'
            });
  
  
  
  
  
 });
            
            
    }]);