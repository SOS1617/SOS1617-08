angular.module("SOS08ManagerApp").

controller("ApiExterna2ChartCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized (External Api 1");
        
        $scope.apikey = "hf5HF86KvZ";
        $scope.data = {};
        var dataCache = {};
        $scope.show_title = [];
        $scope.release_year= [];
       
       

$http.get("https://netflixroulette.net/api/api.php?actor=Penelope%20Cruz").then(function(response){
                
                
            dataCache = response.data;
            $scope.data = dataCache;
            
           
            for(var i=0; i<response.data.length; i++){
                
                $scope.show_title.push($scope.data[i].show_title);
                $scope.release_year.push($scope.data[i].release_year);
               
               
                
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
                        $scope.show_title
                    
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
                    "values": $scope.release_year,
                    "text": "Year of release",
                    "line-color": 'green',
                    "legend-item":{
                      "background-color": "#007790",
                      "borderRadius":5,
                      "font-color":"white"
                    },
                    
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
}]);