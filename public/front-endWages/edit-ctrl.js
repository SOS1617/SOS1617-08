
angular
    .module("WageManagerApp")
    .controller("RobertoEditCtrl",["$scope", "$http" ,"$routeParams","$location", function($scope, 
    $http,$routeParams,$location){
        
        $scope.url = "/api/v1/wages/";
        console.log("Edit Controller initializeddd ");
                $scope.apikey="hf5HF86KvZ";

        
        
        
    function refresh(){
          $scope.apikey="hf5HF86KvZ";
          console.log($scope.url+$routeParams.province+"/"+ $routeParams.year+"?apikey="+ $scope.apikey)
            $http
            
                .get($scope.url+$routeParams.province+"?apikey="+ $scope.apikey)
                .then(function(response){
                    console.log( "Showing refresh "  );

                    $scope.data = JSON.stringify(response.data, null, 2); 
                    $scope.updatedWage = response.data[0];

                });
            }   
            refresh();
            
            $scope.refresh=refresh();
            
         
        /*
           $scope.getData = function(){
            $http
            .get($scope.url+"?apikey="+ $scope.apikey+$routeParams.province)
            .then(function(response){
               $scope.wages= response.data;
                console.log( "Showing data "  );

                });
                
              }    
    */

        
        //PUT
        $scope.putStatss = function(){
            delete $scope.updatedWage._id;
            $http
                
                .put($scope.url +$routeParams.province+"/"+ $routeParams.year+ "?apikey="+ $scope.apikey, $scope.updatedWage)
                .then(function(response){
                    console.log( "Wages has been modified. "  );
                                delete $scope.updatedWage._id;

                    $location.path("/");
                });
        }
           
      
           
}]);  