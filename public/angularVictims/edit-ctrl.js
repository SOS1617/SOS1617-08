/* global angular */
/* global Materialize */
var previousPage;
var nextPage;
var setPage;

angular.module("SOS08ManagerApp").
controller("VictimsEditCtrl", ["$scope", "$http", "$routeParams", "$location", "$rootScope", function($scope, $http, $routeParams, $location, $rootScope) {
    console.log("Victim Edit Controller initialized");

    if (!$rootScope.apikey) $rootScope.apikey = "hf5HF86KvZ";

    function refresh() {
        $http
            .get("../api/v1/victims/" + $routeParams.province + "/" + $routeParams.year + "?" + "apikey=" + $rootScope.apikey)
            .then(function(response) {
                $scope.editDataUnit = response.data;
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

    $scope.discardData = function() {
        console.log("Going to main view");
        $location.path('/victims');
    };

    $scope.editData = function(data) {
        delete data._id;
        $http
            .put("../api/v1/victims/" + data.province + "/" + data.year + "?" + "apikey=" + $rootScope.apikey, data)
            .then(function(response) {
                console.log("province  " + data.province + " correctly edited ");
                Materialize.toast('<i class="material-icons">done</i> ' + data.province + '  correctly edited', 4000);
                $location.path('/victims');
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
