angular.module("SOS08ManagerApp").

controller("api3-controller", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized (External Api 3");
        
        $scope.apikey = "hf5HF86KvZ";
        $scope.data = {};
        var dataCache = {};
        $scope.id = [];
       $scope.year= [];
         $scope.datos = [];
        $scope.datos2 = [];
       
    
       
 $http.get("/api/v1/victims"+ "?" + "apikey=" + $scope.apikey).then(function(response){
                
                dataCacheVictims = response.data;
                $scope.dataVictims =dataCacheVictims;
                
                for(var i=0; i<response.data.length; i++){
                $scope.year.push(Number($scope.dataVictims[i].year));
                }
$http.get("https://blockchain.info/es/ticker").then(function(response){                
                
            dataCache = response.data;
            $scope.data = dataCache;
            
            
           
            for(var i=0; i<$scope.dataVictims.length; i++){
                var ar=[];
                 console.log($scope.data[i]);
                $scope.datos2.push({"year":$scope.year[i],"last update":$scope.data[i].last_update});
                
                
           }    
  
          
         

          

chart = AmCharts.makeChart( "charts08", {
  "type": "serial",
  "theme": "light",
  "dataProvider": $scope.datos2,
  "valueAxes": [ {
    "gridColor": "#FFFFFF",
    "gridAlpha": 0.2,
    "dashLength": 0
  } ],
  "gridAboveGraphs": true,
  "startDuration": 1,
  "graphs": [ {
    "balloonText": "[[category]]: <b>[[value]]</b>",
    "fillAlphas": 0.8,
    "lineAlpha": 0.2,
    "type": "column",
    "valueField": "mortalityRate"
  } ],
  "chartCursor": {
    "categoryBalloonEnabled": false,
    "cursorAlpha": 0,
    "zoomable": false
  },
  "categoryField": "date",
  "categoryAxis": {
    "gridPosition": "start",
    "gridAlpha": 0,
    "tickPosition": "start",
    "tickLength": 20
  },
  "export": {
    "enabled": true
  }

});
});
});


    }]);