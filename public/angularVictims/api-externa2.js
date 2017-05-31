angular.module("SOS08ManagerApp").

controller("api2-controller", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized (External Api 2)");
        
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
$http.get("https://api.fixer.io/latest").then(function(response){                
                
            dataCache = response.data;
            $scope.data = dataCache;
            
            
           
            for(var i=0; i<$scope.dataVictims.length; i++){
                var ar=[];
                ar.push($scope.data.base);
                ar.push($scope.year[i]);
                //ar.push($scope.data.rates.USD);
                
                
                $scope.datos2.push(ar);
            
           
           }      
          
          
          
/*$http.get("/proxy/weather").then(function(response){                
                
            dataCache = response.data;
            $scope.data = dataCache;
            
            
           
            for(var i=0; i<response.data.length; i++){
                var ar=[];
                ar.push($scope.data[i]["coord"]);
                if($scope.birthRate[i]!=null)
                    ar.push($scope.birthRate[i]);
                
                
                $scope.datos2.push(ar);
            
           
           }      
          */
            
 
chart = anychart.cartesian();
console.log($scope.datos2);
console.log(response.data.length);
  
  
// data

  
// add a marker seris
chart.bubble($scope.datos2);
  
// set chart title
chart.title("Bubble Chart");
chart.maxBubbleSize(20);
chart.minBubbleSize(10);
// set axes titles 
chart.xAxis().title("RMS");
chart.yAxis().title("Victims");
  
// draw
chart.container("charts08");
chart.draw();
});
});


    }]);