angular.module("SOS08ManagerApp").

controller("api4-controller", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized (External Api 4)");
        
        $scope.apikey = "hf5HF86KvZ";
        $scope.data = {};
        var dataCache = {};
        $scope.id = [];
       $scope.year= [];
         $scope.datos = [];
        $scope.datos2 = [];
       
    
       
 $http.get("/api/v1/victims"+ "?" + "apikey=" + $scope.apikey).then(function(response){
                
                dataCacheBirth = response.data;
                $scope.dataBirth =dataCacheBirth;
                
                for(var i=0; i<response.data.length; i++){
                $scope.year.push(Number($scope.dataBirth[i].year));
                }
$http.get("/proxy/futbol").then(function(response){
                
               dataCache = response.data;
               $scope.data = dataCache;
                
            for(var i=0; i<$scope.dataBirth.length; i++){
                var ar=[];
                $scope.datos2.push({"year":$scope.year[i],"championship":$scope.data[i]["caption"]});
            } 
/*$http.get("https://api.football-data.org/v1/competitions").then(function(response){                
                
            dataCache = response.data;
            $scope.data = dataCache;
            
            
           
            for(var i=0; i<$scope.dataBirth.length; i++){
                var ar=[];
                $scope.datos2.push({"mortalityRate":$scope.birthRate[i],"date":$scope.data[i].caption});
                
                
           }   
  
          */
         
console.log($scope.datos2);
          

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
    "valueField": "year"
  } ],
  "chartCursor": {
    "categoryBalloonEnabled": false,
    "cursorAlpha": 0,
    "zoomable": false
  },
  "categoryField": "championship",
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