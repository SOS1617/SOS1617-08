angular
    .module("WageManagerApp")
    .controller("ListCtrl",["$scope","$http",function($scope,$http){
        
        
         $scope.url = "/api/v1/wages";
        $scope.apikey="hf5HF86KvZ";
        console.log("Controller Initialized (splited right)");
        
        
    //LOAD INITIAL DATA
        $scope.loadInitialData= function(){
            $http.get($scope.url+"/loadInitialData?apikey="+$scope.apikey)
            .then(function(){
                console.log("Load, OK");
                refresh();
            })
        }
        
        //Funcion para actualizar la tabla cada vez que haya una accion
        function refresh(){
       $http
            .get($scope.url+"?apikey="+ $scope.apikey)
            .then(function(response){
                 $scope.data = JSON.stringify(response.data, null, 2);
               $scope.wages= response.data;
               
                });
                
              }     
              
          
    //POST SINGLE RESOURCE         
        $scope.addWage=function(){
            $http
                .post($scope.url+"?apikey="+ $scope.apikey,$scope.newWage)
                .then(function(response){
                    console.log("Wage added"); 
                refresh();

                }); 
                }
                
            //GET CON PAGINACIÓN
        $scope.getData = function(){
           
            $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.data = JSON.stringify(response.data, null, 2); 
                    $scope.stats = response.data;
                });
            
        } 
        
         //BÚSQUEDAS
        $scope.searches = function(){
            $http
                .get($scope.url+"?apikey="+$scope.apikey+"&country="+$scope.newCountry.country+"&year="+$scope.newCountry.year)
                .then(function(response){
                    console.log("The search of: "+$scope.newCountry.country +" in year "+ $scope.newCountry.year+ " works correctly");
                    $scope.data = JSON.stringify(response.data, null, 2); // null,2 sirve para renderizar el JSON, que lo muestre bonito, etc...
                    $scope.stats = response.data; 
                });
        }
                
                    //PUT   
        $scope.putStats = function(){
            $http
            //$scope.newCountry guarda el país que le estoy metiendo
                .put($scope.url+"/"+ $scope.newWage.province + "?apikey="+ $scope.apikey, $scope.newWage)
                .then(function(response){
                    console.log( "Wages updated"  );
                    refresh();
                });
        }
                
                //delete one resource
                 $scope.deleteWage=function(province,year){
                     $http
                .delete($scope.url+"/"+ province +"/"+ year +"/?apikey="+$scope.apikey)
                .then(function(response){
                    console.log("Deleting Wage "+ province+" ...");
                refresh();

                }); 
                 }
                 
                 //delete a todos
                 $scope.deleteWages=function(){
                     $http
                .delete($scope.url+"?apikey="+ $scope.apikey)
                .then(function(response){
                    console.log("Deleting all wages ...");
                refresh();

                }); 
                 }
                    refresh();
        }]);