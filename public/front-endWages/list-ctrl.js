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
                    $scope.data = JSON.stringify(response.data, null, 2); // null,2 sirve para renderizar el JSON, que lo muestre bonito, etc...
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
    
    
    //GET A UN CONJUNTO CON PAGINACIÓN
   /*     $scope.getData = function(){
           
            $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function successCallback(response) {
    // this callback will be called asynchronously
    // when the response is available</strong>
  }, function errorCallback(response) {
     // called asynchronously if an error occurs
    // or server returns response with an error status.</strong>
  });
    } */
   //GET A UN CONJUNTO CON PAGINACIÓN
        $scope.getDataPag = function(){
           
            $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.data = JSON.stringify(response.data, null, 2); 
                    $scope.wages = response.data;
                    console.log("Showing data with pag" );

                });
            
        } 
        //MÉTODO PARA AÑADIR UN PAÍS    
        $scope.addStats = function(){
            $http
                .post($scope.url+"?apikey="+ $scope.apikey, $scope.newWage)
                .then(function(response){
                    console.log("Wage Added." );
                    refresh();
                });
        } 
        
        
        //MÉTODO PARA MODIFICAR UN PAÍS    
        $scope.putStats = function(){
            $http
                .put($scope.url +"/"+ $scope.newWage.province + "?apikey="+ $scope.apikey, $scope.newWage)
                .then(function(response){
                    console.log( "Wages has been modified. "  );
                    refresh();
                });
        }
        
        //MÉTODO PARA ELIMINAR TODOS LOS PAISES
       /* $scope.deleteAllWages = function(){
            $http
                .delete($scope.url+"?apikey="+ $scope.apikey)
                .then(function(response){
                    console.log("All wages delete");
                    refresh();
                });
        }
        */
        
        //delete a todos
                 $scope.deleteAllWages=function(){
                     $http
                .delete($scope.url+"?apikey="+ $scope.apikey)
                .then(function(response){
                    console.log("Deleting all wages ...");
                                    refresh();


                }); 
                 }

        //MÉTODO PARA BORRAR UN PAÍS
        $scope.deleteWage = function(province,year){
            $http
                .delete($scope.url +"/"+ province +"/"+ year +"/?apikey="+$scope.apikey)
                .then(function(response){
                    console.log("Wages delete from: "+ province);
                    refresh();
                });
        } 
        
        
        //MÉTODO PARA LAS BÚSQUEDAS
        $scope.searches = function(){
            $http
                .get($scope.url+"?apikey="+$scope.apikey+"&province="+$scope.newWage.province+"&year="+$scope.newWage.year)
                .then(function(response){
                    console.log("The search of: "+$scope.newWage.province +" in year "+ $scope.newWage.year+ " works correctly");
                    $scope.data = JSON.stringify(response.data, null, 2); 
                    $scope.stats = response.data; 
                });
        }
           
}]);  