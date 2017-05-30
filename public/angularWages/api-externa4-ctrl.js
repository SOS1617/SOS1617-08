angular.module("SOS08ManagerApp").

controller("ApiExterna4ChartCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

        $scope.apikey = "hf5HF86KvZ";
        $scope.data = {};
        var dataCache = {};
        $scope.date = [];
       $scope.varied= [];
         $scope.datos = [];
        $scope.datos2 = [];
       $scope.dataBirth=[];
    
       
 $http.get("/api/v1/wages"+ "?" + "apikey=" + $scope.apikey).then(function(response){
                
                dataCacheBirth = response.data;
                $scope.dataBirth =dataCacheBirth;
                
                for(var i=0; i<response.data.length; i++){
                $scope.varied.push(Number($scope.dataBirth[i].varied));
                }
$http.get("https://api.aladhan.com/currentTime?zone=Europe/London").then(function(response){                
                
            dataCache = response.data;
            $scope.data = dataCache;
            
            
           
            for(var i=0; i<$scope.dataBirth.length; i++){
                var ar=[];
                 console.log($scope.data[i]);
                $scope.datos2.push({"varied":$scope.varied[i],"date":$scope.sta});
                
                
           }    
  
          
         

          

chart = AmCharts.makeChart( "chartRobertooo", {
  "type": "serial",
  "theme": "dark",
  "dataProvider": $scope.datos2,
  "valueAxes": [ {
    "gridColor": 'green',
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
    "valueField": "varied"
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
    "enabled": false
  }

});
});
});


    }]);