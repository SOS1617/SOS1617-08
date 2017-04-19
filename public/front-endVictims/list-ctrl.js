//Obtengo el modulo y creo el controlador sobre él
angular
    .module("VictimsManagerApp")
    .controller("ListCtrl",["$scope", "$http", function($scope, $http){
        
        $scope.url = "/api/v1/victims";

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
                    $scope.victims = response.data;
                });
            }   
            
         
        
           $scope.getData = function(){
            $http
            .get($scope.url+"?apikey="+ $scope.apikey)
            .then(function(response){
               $scope.victims= response.data;
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
      /*  $scope.getData = function(){
           
            $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.data = JSON.stringify(response.data, null, 2); 
                    $scope.victims = response.data;
                    console.log("Showing data with pag" );

                });
        } */
        //GET A UN CONJUNTO CON PAGINACIÓN
        
         $scope.getDataPag = function(){
           
            $http
                .get($scope.url+"?apikey="+ $scope.apikey +"&limit="+ $scope.limit +"&offset="+$scope.offset)
                .then(function(response){
                    $scope.data = JSON.stringify(response.data, null, 2); 
                    $scope.victims = response.data;
                });
            
        } ;
        //MÉTODO PARA AÑADIR UN PAÍS    
        $scope.addStats = function(){
            $http
                .post($scope.url+"?apikey="+ $scope.apikey, $scope.newVictim)
                .then(function(response){
                    console.log("Victim Added." );
                    refresh();
                });
        } 
        
        
        //MÉTODO PARA MODIFICAR UN PAÍS    
        $scope.putStats = function(){
            $http
                .put($scope.url +"/"+ $scope.newVictim.province +"/"+ $scope.newVictim.year + "?apikey="+ $scope.apikey, $scope.newVictim)
                .then(function(response){
                    console.log( "victims has been modified. "  );
                    refresh();
                });
        }
        
        //MÉTODO PARA ELIMINAR TODOS LOS PAISES
       /* $scope.deleteAllvictims = function(){
            $http
                .delete($scope.url+"?apikey="+ $scope.apikey)
                .then(function(response){
                    console.log("All victims delete");
                    refresh();
                });
        }
        */
        
        //delete a todos
                 $scope.deleteAllVictims=function(){
                     $http
                .delete($scope.url+"?apikey="+ $scope.apikey)
                .then(function(response){
                    console.log("Deleting all Victims ...");
                                    refresh();


                }); 
                 }

        //MÉTODO PARA BORRAR UN PAÍS
        $scope.deleteVictim = function(province,year){
            $http
                .delete($scope.url +"/"+ $scope.newVictim.province +"/"+ $scope.newVictim.year +"/?apikey="+$scope.apikey)
                .then(function(response){
                    console.log("Victims deleted ");
                    refresh();
                });
        } 
        
          $scope.searches = function(){
            $http
                .get($scope.url+"?apikey="+$scope.apikey+"&from="+$scope.newVictim.from+"&to="+$scope.newVictim.to)
                .then(function(response){
                    console.log("The between year: "+$scope.newVictim.from +" and year "+ $scope.newVictim.to+ " works correctly");
                    $scope.data = JSON.stringify(response.data, null, 2); 
                    $scope.victims = response.data; 
                });
        };
           
}]);  