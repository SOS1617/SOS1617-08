angular.module("SOS08ManagerApp").

controller("api1-controller", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized (External Api 1)");
        
        $scope.apikey = "hf5HF86KvZ";
        $scope.data = {};
        var dataCache = {};
        $scope.id = [];
       $scope.year= [];
         $scope.datos = [];
        $scope.datos2 = [];
       
    
       
 $http.get("/api/v1/victims"+ "?" + "apikey=" + $scope.apikey).then(function(response){
                
                dataCacheVictim = response.data;
                $scope.dataVictim =dataCacheVictim;
                
                for(var i=0; i<response.data.length; i++){
                $scope.year.push(Number($scope.dataVictim[i].year));
                }

$http.get("https://api.github.com/users").then(function(response){
                
                
            dataCache = response.data;
            $scope.data = dataCache;
            
            
           
            for(var i=0; i<$scope.dataVictim.length; i++){
                var ar=[];
                ar.push($scope.data[i].login);
                ar.push($scope.year[i]);
                
                $scope.datos2.push(ar);
            
           
           }      
          
            
    /*anychart.onDocumentReady(function () {
     console.log($scope.datos2);
    // create column chart
    chart = anychart.column();

    // turn on chart animation
    chart.animation(true);

    // set chart title text settings
    chart.title('Externa 1');

    // create area series with passed data
    var series = chart.column($scope.datos2);
    
    //var series = chart.column([['p','89'],['o','25']]);
    

    // set series tooltip settings
    series.tooltip().titleFormat('{%X}');

    series.tooltip()
            .position('top')
            .anchor('bottom')
            .offsetX(0)
            .offsetY(5)
            .format('{%Value}{groupsSeparator: }');

    // set scale minimum
    chart.yScale().minimum(0);

    // set yAxis labels formatter
    chart.yAxis().labels().format('{%Value}{groupsSeparator: }');

    // tooltips position and interactivity settings
    chart.tooltip().positionMode('point');
    chart.interactivity().hoverMode('byX');

    // axes titles
    

    // set container id for the chart
    chart.container('dashboard');

    // initiate chart drawing
    chart.draw();
});*/
chart = anychart.cartesian();
console.log($scope.datos2);
  
// data
data = [  
    ["2000", 1100, 1],
    ["2001", 880, 2],
    ["2002", 1100, 5],
    ["2003", 1500, 3],
    ["2004", 921, 3],
    ["2005", 1000, 2],
    ["2006", 1400, 1]
];
  
// add a marker seris
chart.bubble($scope.datos2);
  
// set chart title
chart.title("Bubble Chart");
chart.maxBubbleSize(20);
chart.minBubbleSize(10);
// set axes titles 
chart.xAxis().title("Login");
chart.yAxis().title("Year");
  
// draw
chart.container("charts08");
chart.draw();
});
});
    }]);