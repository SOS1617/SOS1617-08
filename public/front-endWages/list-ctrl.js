//Obtengo el modulo y creo el controlador sobre él
angular
    .module("WageManagerApp")
    .controller("ListCtrl",["$scope", "$http", function($scope, $http){
        
        $scope.url = "/api/v1/wages";
        console.log("Controller initialized ");
        
        //CARGAR DATOS
        $scope.loadInitialData= function(){
            $http.get($scope.url+"/loadInitialData?apikey="+$scope.apikey)
            .then(function(){
                console.log("Load initial data: OK");
                refresh();
            })
        }
        
    function refresh(){
            $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.data = JSON.stringify(response.data, null, 2); 
                    $scope.wages = response.data;
                });
            }   
            
         
        
           $scope.getData = function(){
            $http
            .get($scope.url+"?apikey="+ $scope.apikey)
            .then(function(response){
               $scope.wages= response.data;
                console.log( "Showing data "  );

                });
                
              }    
    
    
        
         $scope.getDataPag = function(){
           
            $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.data = JSON.stringify(response.data, null, 2); 
                    $scope.wages = response.data;
                    console.log( "Showing data with limit and offset "  );

                });
            
        } ;
//POST
        $scope.addStats = function(){
            $http
                .post($scope.url+"?apikey="+ $scope.apikey, $scope.newWage)
                .then(function(response){
                    console.log("Wage Added." );
                    refresh();
                });
        } 
        
        
        //PUT
        $scope.putStats = function(){
            $http
                .put($scope.url +"/"+ $scope.newWage.province +"/"+ $scope.newWage.year + "?apikey="+ $scope.apikey, $scope.newWage)
                .then(function(response){
                    console.log( "Wages has been modified. "  );
                    refresh();
                });
        }
        
      
        //delete a todos
                 $scope.deleteAllWages=function(){
                     $http
                .delete($scope.url+"?apikey="+ $scope.apikey)
                .then(function(response){
                    console.log("Deleting all wages ...");
                                    refresh();


                }); 
                 }

//DELETE SINGLE
$scope.deleteWage = function(province,year){
            $http
                .delete($scope.url +"/"+ $scope.newWage.province +"/"+ $scope.newWage.year +"/?apikey="+$scope.apikey)
                .then(function(response){
                    console.log("Wages deleted ");
                    refresh();
                });
        } 
        
$scope.deleteOneSalary = function(province,year){
            $http
                .delete($scope.url +"/"+ province +"/"+ year +"/?apikey="+$scope.apikey)
                .then(function(response){
                    console.log("Wage deleted");
                    refresh();
                });
        } ;
        
          $scope.searches = function(){
            $http
                .get($scope.url+"?apikey="+$scope.apikey+"&from="+$scope.newWage.from+"&to="+$scope.newWage.to)
                .then(function(response){
                    $scope.data = JSON.stringify(response.data, null, 2); 
                    $scope.wages = response.data; 
                                    console.log( "Showing data with your search"  );

                });
        };
           
}]);  