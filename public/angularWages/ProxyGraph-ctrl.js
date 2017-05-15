
angular
    .module("SOS08ManagerApp")
    .controller("WagesProxyGraphCtrl",["$scope","$http",function ($scope, $http){
        
        $scope.apikey = "hf5HF86KvZ";
        $scope.data = {};
        var dataCacheExport = {};
        var dataCacheWages = {};
        $scope.categorias = [];
        $scope.categorias1 = [];
        $scope.oil = [];
        $scope.importS = [];
        $scope.exportS =[];
        $scope.year = [];
        $scope.varied = [];

        
        function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
        }
     
     
     
     
        ////////////////////
        /////DATOS IVAN/////
        ////////////////////
        
        $http.get("/api/v1/wages/proxy/"+ "?" + "apikey=" + $scope.apikey).then(function(response){
            
            dataCacheExport = response.data;
            $scope.data =dataCacheExport;
            
            for(var i=0; i<response.data.length; i++){
                $scope.categorias.push(capitalizeFirstLetter($scope.data[i].province));
                $scope.oil.push(Number($scope.data[i].oil));
                $scope.importS.push(Number($scope.data[i].importS));
                $scope.exportS.push(Number($scope.data[i].exportS));
            }
            console.log("Datos oil: "+$scope.data);
             ////////////////////
            /////DATOS /////
            ////////////////////
            $http.get("/api/v1/wages"+ "?" + "apikey=" + $scope.apikey).then(function(response){
                
                dataCacheWages = response.data;
                $scope.data =dataCacheWages;
                
                for(var i=0; i<response.data.length; i++){
                    $scope.categorias1.push(capitalizeFirstLetter($scope.data[i].province));
                    $scope.year.push(Number($scope.data[i]["year"]));
                    $scope.varied.push(Number($scope.data[i]["varied"]));
                }
                 console.log("Datos wages: "+$scope.data);
                
            ////////////////////////////
            ////COMPARATIVA  2017////
            ////////////////////////////
            Highcharts.chart('container',{
                title: {
                            text: 'Integrated G07 & G08'
                },
                chart: {
                    type: 'line'
                },
                xAxis: {
                    categories: $scope.categorias1
                },
                legend: {
                    layout: 'vertical',
                    floating: true,
                    backgroundColor: '#FFFFFF',
                    //align: 'left',
                    verticalAlign: 'top',
                    align: 'right',
                    y: 30,
                    x: 0
                },
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.series.name + '</b><br/>' +
                            capitalizeFirstLetter(this.x) + ': ' + this.y;
                    }
                },
                series:[{
                    name: 'oil',
                    data: $scope.oil
                },
                {
                    name: 'Wages Varied',
                    data: $scope.varied
                }]
            });
        }); 
    });
}]);