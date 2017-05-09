/* global angular */
/* global Materialize */
var previousPage;
var nextPage;
var setPage;

angular.module("SOS08ManagerApp").
controller("WagesEditCtrl", ["$scope", "$http", "$routeParams", "$location", "$rootScope", function($scope, $http, $routeParams, $location, $rootScope) {
    console.log("Wages Edit Controller initialized");

    if (!$rootScope.apikey) $rootScope.apikey = "hf5HF86KvZ";

    function refresh() {
        $http
            .get("../api/v1/wages/" + $routeParams.province + "/" + $routeParams.year + "?" + "apikey=" + $rootScope.apikey)
            .then(function(response) {
                $scope.editDataUnit = response.data[0];
            }, function(response) {
                switch (response.status) {
                    case 401:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key missing!', 4000);
                        break;
                    case 403:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key incorrect!', 4000);
                        break;
                    case 404:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - data not found!', 4000);
                        break;
                    default:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data!', 4000);
                        break;
                }
            });
    }

    $scope.deleteeData = function() {
        console.log("Going to main view");
        $location.path('/wages');
    };

    $scope.editData = function(data) {
        delete data._id;
        $http
            .put("../api/v1/wages/" + data.province + "/" + data.year + "?" + "apikey=" + $rootScope.apikey, data)
            .then(function(response) {
                console.log("Wage " + data.province + " changed");
                Materialize.toast('<i class="material-icons">done</i> ' + data.province + ' has changed', 4000);
                $location.path('/wages');
            }, function(response) {
                switch (response.status) {
                    case 400:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error editing data - incorrect data was entered!', 4000);
                        break;
                    case 401:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key missing!', 4000);
                        break;
                    case 403:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key incorrect!', 4000);
                        break;
                    default:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error editing data!', 4000);
                        break;
                }
            });
    };

    refresh();
}]);
