/* global angular */
/* global Materialize */
var previousPage;
var nextPage;
var setPage;

angular.module("SOS08ManagerApp").
controller("WagesEditCtrl", ["$scope", "$http", "$routeParams", "$location", "$rootScope", function($scope, $http, $routeParams, $location, $rootScope) {
    console.log("Wage Edit Controller initialized");

    if (!$rootScope.apikey) $rootScope.apikey = "hf5HF86KvZ";

    function refresh() {
        $http
            .get("../api/v1/wages/" + $routeParams.province + "/" + $routeParams.year + "?" + "apikey=" + $rootScope.apikey)
            .then(function(response) {
                $scope.editDataUnit = response.data;
            }, function(response) {
                switch (response.status) {
                    case 401:
                        Materialize.toast('<i class="material-icons">error_outline</i> No apikey', 4000);
                        break;
                    case 403:
                        Materialize.toast('<i class="material-icons">error_outline</i> Apikey incorrect', 4000);
                        break;
                    case 404:
                        Materialize.toast('<i class="material-icons">error_outline</i> No data', 4000);
                        break;
                    default:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error data', 4000);
                        break;
                }
            });
    }

    $scope.discardData = function() {
        console.log("Going back");
        $location.path('/wages');
    };

    $scope.editData = function(data) {
        delete data._id;
        $http
            .put("../api/v1/wages/" + data.province + "/" + data.year + "?" + "apikey=" + $rootScope.apikey, data)
            .then(function(response) {
                console.log("province  " + data.province + " correctly edited ");
                Materialize.toast('<i class="material-icons">done</i> ' + data.province + '  correctly edited', 4000);
                $location.path('/wages');
            }, function(response) {
                switch (response.status) {
                    case 400:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error data', 4000);
                        break;
                    case 401:
                        Materialize.toast('<i class="material-icons">error_outline</i> no apikey', 4000);
                        break;
                    case 403:
                        Materialize.toast('<i class="material-icons">error_outline</i> Api key incorrect', 4000);
                        break;
                    default:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error to edir', 4000);
                        break;
                }
            });
    };

    refresh();
}]);
