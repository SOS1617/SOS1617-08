angular
    .module("SOS08ManagerApp")
    .controller("ChartsComunCtrl",["$scope","$http",function ($scope, $http){
        
        
        //Salaries
        
        $scope.apikey = "hf5HF86KvZ";
        $scope.dataWage = {};
        var dataCacheWage = {};
        $scope.varied= [];
        $scope.averageWage = [];
        $scope.year = [];
        
        //numberVictims
        $scope.dataVictims = {};
        var dataCacheVictims = {};
        $scope.numberVictims = [];
            
            //Get numberVictimsStats
            $http.get("/api/v1/victims"+ "?" + "apikey=" + $scope.apikey).then(function(response){
                
                dataCacheVictims = response.data;
                $scope.dataVictims =dataCacheVictims;
                
                for(var i=0; i<response.data.length; i++){
                $scope.numberVictims.push(Number($scope.dataVictims[i].numberVictims));
                }
            
            //Get Wage API
            
                    $http.get("/api/v1/wages"+ "?" + "apikey=" + $scope.apikey).then(function(response){
                
                        dataCacheWage = response.data;
                        $scope.dataWage =dataCacheWage;
                
                        for(var i=0; i<response.data.length; i++){
                            $scope.year.push(Number($scope.dataWage[i].year));
                            $scope.varied.push(Number($scope.dataWage[i].varied));
                            $scope.averageWage.push(Number($scope.dataWage[i].averageWage));

                }
                
                Highcharts.chart('container',{
                        title: {
                            text: 'Integrated Victims that year and the average wage G08 '
                        },
                        chart: {
                            type: 'column'
                        },
                        xAxis: {
                            categories: $scope.year
                        },
                        legend: {
                            layout: 'horizontal',
                            floating: true,
                            backgroundColor: 'orange',
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
                            name: 'varied',
                            data: $scope.varied
                        },
                        {
                            name: 'averageWage',
                            data: $scope.averageWage
                        },
                        {
                            name: 'numberVictims',
                            data: $scope.numberVictims
                        }]
                    });
                
                
                
                
                    })
                })
            
    }]);