
angular
    .module("SOS08ManagerApp")
    .controller("WagesRemoteGraphCtrl",["$scope","$http",function ($scope, $http){
        
        $scope.apikey = "hf5HF86KvZ";
        $scope.dataEducation = {};
        $scope.dataWages = {};
        var dataCacheEducation = {};
        var dataCacheWages = {};
        $scope.categorias = [];
        $scope.categorias1 = [];
        //G07
        $scope.oil = [];
        $scope.importS = [];
        $scope.exportS =[];
        //G08
        $scope.year = [];
        $scope.varied = [];

      

//G07s
                
     $http.get("https://sos1617-04.herokuapp.com/api/v2/export-and-import?apikey=12345").then(function(response){
                
                dataCacheEducation = response.data;
                $scope.dataEducation =dataCacheEducation;
                
                for(var i=0; i<response.data.length; i++){
                    $scope.categorias.push($scope.dataEducation[i].province);
                    $scope.oil.push(Number($scope.dataEducation[i].oil));
                    $scope.importS.push(Number($scope.dataEducation[i].importS));
                    $scope.exportS.push(Number($scope.dataEducation[i].exportS));
                }
                
                console.log("Wages: "+$scope.dataEducation);
                
              //G08
              
            $http.get("/api/v1/wages"+ "?" + "apikey=" + $scope.apikey).then(function(response){
                
                dataCacheWages = response.data;
                $scope.dataWages =dataCacheWages;
                
                for(var i=0; i<response.data.length; i++){
                    $scope.categorias1.push($scope.dataWages[i].province);
                    $scope.year.push(Number($scope.dataWages[i]["year"]));
                    $scope.varied.push(Number($scope.dataWages[i]["varied"]));
                }
                    console.log("Wages: "+$scope.dataWages);


                    ////////////////////////////
                    ////COMPARATIVA  2017////
                    ////////////////////////////
                    Highcharts.chart('container',{
                        title: {
                            text: 'Integrated G07 & G08'
                        },
                        chart: {
                            type: 'area'
                        },
                        xAxis: {
                            categories: $scope.categorias
                        },
                        legend: {
                            layout: 'vertical',
                            floating: true,
                            backgroundColor: '#FFFFFF',
                            //align: 'left',
                            verticalAlign: 'top',
                            align: 'right',
                            y: 20,
                            x: 0
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.name + '</b><br/>' +
                                   this.x + ': ' + this.y;
                            }
                        },
                        series:[{
                            name: 'oil',
                            data: $scope.oil,
                        },
                        {
                            name: 'importS',
                            data: $scope.importS,
                        },
                        {
                            name: 'exportS',
                            data: $scope.exportS,
                        },
                        
                        {
                            name: 'Wages Varied',
                            data: $scope.varied
                        }]
                    });});
         
     });
               

}]);