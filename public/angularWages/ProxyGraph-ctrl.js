angular
    .module("SOS08ManagerApp").
    controller("WagesProxyGraphCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {

    if (!$rootScope.apikey) $rootScope.apikey = "hf5HF86KvZ";

    $scope.refresh = function() {
        $http
            .get("../proxy/wages")
            .then(function(response) {
                console.log(JSON.stringify(response.data, null, 2));
            });
    };
    
     $scope.refresh();

}]);
