angular.module("SOS08ManagerApp").
controller("ApiExterna1ChartCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

        $scope.apikey = "hf5HF86KvZ";
        $scope.data = {};
        var dataCache = {};
        $scope.nombrePais = [];
        $scope.area= [];
        $scope.population=[];
        $scope.timezones=[];
       


$http.get("https://restcountries.eu/rest/v1/all").then(function(response){
                
                
            dataCache = response.data;
            $scope.data = dataCache;
            
            for(var i=0; i<response.data.length; i++){
                $scope.nombrePais.push($scope.data[i].name);
                $scope.area.push(Number($scope.data[i].area));
                $scope.population.push(Number($scope.data[i].population));

            }
            
            
       
             //Googleee
            google.charts.load('current', {
                'packages': ['controls','geochart']
            });
            google.charts.setOnLoadCallback(drawRegionsMap);
                        
        
            function drawRegionsMap() {
                var myData = [['Country','Area','Population']];
     
                response.data.forEach(function (d){
                    
                        
                    
                    myData.push([(d.name), Number(d.area), Number(d.population)]);

                    
                });
                    
                var data = google.visualization.arrayToDataTable(myData);
                var options = {
                    region: '150',
                    colorAxis: {colors: ['yellow', 'orange' , 'red']}
                };
                var dashboard = new google.visualization.Dashboard(document.getElementById('dashboard'));

                var populationSelector = new google.visualization.ControlWrapper({
                    controlType: 'CategoryFilter',
                    containerId: 'filter',
                    options: {
                        filterColumnIndex: 0,
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
                        colorAxis: {colors: ['yellow', 'orange' , 'red']}
                    }
                });
                dashboard.bind(populationSelector, chart);

                dashboard.draw(data, options);
            }    
            
});
}]);