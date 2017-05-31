angular.module("SOS08ManagerApp").

controller("ApiExterna5ChartCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized (External Api 1");
        
        $scope.apikey = "hf5HF86KvZ";
        $scope.data = {};
        $scope.data1 = {};
        var dataCache = {};
        var dataCache1={};
        $scope.id = [];
        $scope.datos=[];

        $scope.name= [];
        $scope.varied = [];
        $scope.province=[];
        $scope.averageWage = [];

 function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            }
       
 $http.get("/api/v1/wages/"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            dataCache1 = response.data;
            $scope.data1 = dataCache1;
            
            for(var i=0; i<response.data.length; i++){
                $scope.datos.push(capitalizeFirstLetter($scope.data1[i].province) + " " + $scope.data1[i].year);
                $scope.varied.push(Number($scope.data1[i].varied));
                $scope.averageWage.push(Number($scope.data1[i].averageWage));
                $scope.province.push(Number($scope.data1[i].province));
            }
         

$http.get("https://data.police.uk/api/leicestershire/neighbourhoods").then(function(response){
                
                
            dataCache = response.data;
            $scope.data = dataCache;
            
           
            for(var i=0; i<response.data.length; i++){
                
                $scope.id.push($scope.data[i].id);
                $scope.name.push($scope.data[i].name);
               
               
                
            }
          
            
        
       
            //ZingChart
            var myConfig = {
                "type": "area",
                
                "backgroundColor":'black',
                "title": {
                    "text": "Penelope Cruz Movies",
                    "fontColor":'red',
                    "font-size": "24px",
                    "adjust-layout": true
                },
                "plotarea": {
                    "margin": "dynamic 45 60 dynamic",
                },
                
                "legend": {
                    "layout": "float",
                    "background-color": "none",
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
                        "text": "Movies",
                        "fontColor":"green",

                    },
                    "labels": 
                        $scope.name
                    
                },
                "scale-y": {
                    "min-value": "0:2020",
                    "label": {
                        "text": "Release Year",
                        "fontColor":'green',

                    },
                    
                },
                
                "crosshair-x": {
                    "line-color": 'purple',
                    "plot-label": {
                    "border-radius": "5px",
                    "border-width": "1px",
                    "border-color": "#f6f7f8",
                    "padding": "10px",
                    "font-weight": "bold"
                },
                "scale-label": {
                    "font-color": "#000",
                    "background-color": 'green',
                    "border-radius": "5px"
                }
            },
                
                "tooltip": {
                    "visible": false
                },
                
                "plot": {
                    "highlight": true,
                    "tooltip-text": "%t views: %v<br>%k",
                    "shadow": 0,
                    "line-width": "2px",
                    "marker": {
                    "type": "circle",
                    "size": 3
                },
                "highlight-state": {
                "line-width": 3
                },
                "animation": {
                    "effect": 1,
                    "sequence": 2,
                    "speed": 100,
                }
                },
                
                "series": [
                {
                    "values": $scope.id,
                    "text": "id Police UK",
                    "line-color": 'green',
                    "legend-item":{
                      "background-color": "#007790",
                      "borderRadius":5,
                      "font-color":"white"
                    },
                    
                    
                }, {
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
                data: myConfig,
                height: '95%',
                width: '90%'
            });
});
});
}]);