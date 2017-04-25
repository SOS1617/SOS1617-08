angular
    .module("WageManagerApp")
    .controller("EditCtrl",["$scope","$http","$routeParams","$location"
        ,function($scope,$http,$routeParams,$location){
            
                    $scope.url = "/api/v1/wages";

        
        console.log("Edit Controller Initialized ");
        function refresh(){
            
        
    // metiendo un dato a pelo directamente    
      // $scope.contact={name:"Pepe", phone: "123234", email: "pepe@pepe.com"};
      
       $http
            .get($scope.url+$routeParams.province)
            .then(function(response){
               $scope.updatedWage= response.data;
               
               
                });
                
              }     
              
              $scope.putStats = function(){
            $http
                .put($scope.url +$routeParams.province, $scope.updatedWage)
                .then(function(response){
                    console.log( "Wages has been modified. "  );
                    $location.path("/")
                });
        }
                                   refresh();

        }]);
        