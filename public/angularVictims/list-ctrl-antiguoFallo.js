/* global angular */
/* global Materialize */
/* global $ */
var previousPage;
var nextPage;
var setPage;

angular.module("SOS08ManagerApp").
controller("VictimsListCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized");

    if (!$rootScope.apikey) $rootScope.apikey = "hf5HF86KvZ";

    $scope.search = {};
    $scope.searchAdd = {};

    $scope.data = {};
    var dataCache = {};
    $scope.currentPage = 1;
    $scope.maxPages = 1;
    $scope.pages = [];
    $scope.pagesLeft = [];
    $scope.pagesMid = [];
    $scope.pagesRight = [];

    var modifier = "";
    var properties = "";

    var elementsPerPage = 2;

    function setPagination() {
        var pagesNearby = 2;
        $scope.pagesLeft = [];
        $scope.pagesMid = [];
        $scope.pagesRight = [];
        if ($scope.maxPages <= pagesNearby * 2) {
            for (var i = 1; i <= $scope.maxPages; i++) $scope.pagesLeft.push(i);
        }
        else if ($scope.currentPage >= 0 && $scope.currentPage <= pagesNearby) {
            //console.log("Left");
            //only left and mid
            for (var i = 1; i <= pagesNearby; i++) $scope.pagesLeft.push(i);
            for (i = $scope.maxPages - pagesNearby + 1; i <= $scope.maxPages; i++) $scope.pagesMid.push(i);
        }
        else if ($scope.currentPage >= $scope.maxPages - pagesNearby + 1 && $scope.currentPage <= $scope.maxPages) {
            //console.log("Right");
            //only left and mid
            for (var i = 1; i <= pagesNearby; i++) $scope.pagesMid.push(i);
            for (i = $scope.maxPages - pagesNearby + 1; i <= $scope.maxPages; i++) $scope.pagesRight.push(i);
        }
        else {
            //console.log("Mid");
            for (var i = 1; i <= pagesNearby; i++) $scope.pagesLeft.push(i);
            for (var i = Math.max($scope.currentPage - 1, pagesNearby + 1); i <= Math.min($scope.currentPage + 1, $scope.maxPages - pagesNearby); i++) $scope.pagesMid.push(i);
            for (i = $scope.maxPages - pagesNearby + 1; i <= $scope.maxPages; i++) $scope.pagesRight.push(i);
            if (($scope.pagesLeft[$scope.pagesLeft.length - 1] == $scope.pagesMid[0] - 1) && ($scope.pagesMid[$scope.pagesMid.length - 1] == $scope.pagesRight[0] - 1)) {
                //console.log("JOIN BOTH");
                $scope.pagesMid = $scope.pagesMid.concat($scope.pagesRight);
                $scope.pagesLeft = $scope.pagesLeft.concat($scope.pagesMid);
                $scope.pagesMid = [];
                $scope.pagesRight = [];
            }
            else if ($scope.pagesLeft[$scope.pagesLeft.length - 1] == $scope.pagesMid[0] - 1) {
                //console.log("JOIN MID INTO LEFT");
                $scope.pagesLeft = $scope.pagesLeft.concat($scope.pagesMid);
                $scope.pagesMid = [];
            }
            else if ($scope.pagesMid[$scope.pagesMid.length - 1] == $scope.pagesRight[0] - 1) {
                //console.log("JOIN MID INTO RIGHT");
                $scope.pagesRight = $scope.pagesMid.concat($scope.pagesRight);
                $scope.pagesMid = [];
            }
        }
    }

    $scope.setPage = function(page) {
        $scope.currentPage = page;
        $scope.refreshPage();
    };

    $scope.previousPage = function() {
        $scope.currentPage--;
        $scope.refreshPage();
    };

    $scope.nextPage = function() {
        $scope.currentPage++;
        $scope.refreshPage();
    };

    $scope.refreshPage = function() {
        if ($scope.currentPage <= 0) $scope.currentPage = 1;
        if ($scope.currentPage > $scope.maxPages) $scope.currentPage = $scope.maxPages;
        setPagination();
        if (dataCache.length > elementsPerPage) {
            $scope.data = dataCache.slice(Number(($scope.currentPage - 1) * elementsPerPage), Number(($scope.currentPage) * elementsPerPage));
        }
        else {
            $scope.data = dataCache;
        }
    };

    var refresh = $scope.refresh = function() {
        $http
            .get("../api/v1/victims" + modifier + "?" + "apikey=" + $rootScope.apikey + "&" + properties)
            .then(function(response) {
                $scope.maxPages = Math.max(Math.ceil(response.data.length / elementsPerPage), 1);
                dataCache = response.data;
                //console.log(JSON.stringify(dataCache, null, 2));
                $scope.refreshPage();
            }, function(response) {
                switch (response.status) {
                    case 401:
                        Materialize.toast('<i class="material-icons">error_outline</i> No apikey!', 4000);
                        break;
                    case 403:
                        Materialize.toast('<i class="material-icons">error_outline</i> Apikey incorrect!', 4000);
                        break;
                    case 404:
                        $scope.maxPages = 1;
                        dataCache = {};
                        $scope.refreshPage();
                        Materialize.toast('<i class="material-icons">error_outline</i> No data', 4000);
                        break;
                    default:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error data!', 4000);
                        break;
                }
            });
    };


    $scope.addData = function() {
        $http
            .post("../api/v1/victims" + "?" + "apikey=" + $rootScope.apikey, $scope.newData)
            .then(function(response) {
                console.log("Data added!");
                Materialize.toast('<i class="material-icons">done</i> ' + $scope.newData.province + ' has been added', 4000);
                refresh();
            }, function(response) {
                Materialize.toast('<i class="material-icons">error_outline</i> Error adding data!', 4000);
            }, function(response) {
                switch (response.status) {
                    case 400:
                        Materialize.toast('<i class="material-icons">error_outline</i> Incorrect data was entered!!', 4000);
                        break;
                    case 401:
                        Materialize.toast('<i class="material-icons">error_outline</i> No apikey', 4000);
                        break;
                    case 403:
                        Materialize.toast('<i class="material-icons">error_outline</i> Apikey incorrect!', 4000);
                        break;
                    default:
                        Materialize.toast('<i class="material-icons">error_outline</i> Error data!', 4000);
                        break;
                }
            });
    };

    $scope.delData = function(data) {
        $http
            .delete("../api/v1/victims/" + data.province + "/" + data.year + "?" + "apikey=" + $rootScope.apikey)
            .then(function(response) {
                console.log("This " + data.province + "has been deleted");
                Materialize.toast('<i class="material-icons">done</i> ' + data.province + ' has been deleted', 4000);
                refresh();
            }, function(response) {
                Materialize.toast('<i class="material-icons">error_outline</i> Error deleting data!', 4000);
            });
    };

    $scope.deleteAllData = function() {
        $http
            .delete("../api/v1/victims" + "?" + "apikey=" + $rootScope.apikey)
            .then(function(response) {
                console.log("All data deleted!");
                Materialize.toast('<i class="material-icons">done</i> All data has been deleted succesfully!', 4000);
                refresh();
            }, function(response) {
                Materialize.toast('<i class="material-icons">error_outline</i> Error deleting all data!', 4000);
            });
    };

    $scope.loadInitialData = function() {
        refresh();
        if ($scope.data.length == 0) {
            $http
                .get("../api/v1/victims/loadInitialData" + "?" + "apikey=" + $rootScope.apikey)
                .then(function(response) {
                    console.log("Initial data loaded");
                    Materialize.toast('<i class="material-icons">done</i> LoadInitialData correct', 4000);
                    refresh();
                }, function(response) {
                    Materialize.toast('<i class="material-icons">error_outline</i> Error initialData!', 4000);
                });
        }
        else {
            Materialize.toast('<i class="material-icons">error_outline</i> List must be empty to add initial data!', 4000);
            console.log("List must be empty!");
        }
    };

    refresh();
    jQuery.noConflict();
   
     $('#apikeyModal').modal({
        complete: function() {
            $rootScope.apikey = $scope.apikey;

            $http
                .get("../api/v1/salaries" + modifier + "?" + "apikey=" + $rootScope.apikey + "&" + properties)
                .then(function(response) {
                    Materialize.toast('<i class="material-icons">done</i> Api key changed successfully!', 4000);
                    $scope.maxPages = Math.max(Math.ceil(response.data.length / elementsPerPage), 1);
                    dataCache = response.data;
                    $scope.refreshPage();
                }, function(response) {
                    $scope.maxPages = 1;
                    dataCache = {};
                    $scope.refreshPage();
                    switch (response.status) {
                        case 401:
                            Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key missing!', 4000);
                            break;
                        case 403:
                            Materialize.toast('<i class="material-icons">error_outline</i> Error getting data - api key incorrect!', 4000);
                            break;
                        default:
                            Materialize.toast('<i class="material-icons">error_outline</i> Error getting data!', 4000);
                            break;
                    }
                });
            console.log("Api key changed!");
        }
    });
 $('#apikeyModal').modal('show');

   $('#searchModal').modal({
        complete: function() {
            modifier = "";
            properties = "";
            if ($scope.from && $scope.to) {
                properties = "from="+$scope.from + "&to=" + $scope.to;
            }
         
        
            Materialize.toast('<i class="material-icons">done</i> Search done successfully!', 4000);
            refresh();
        }
    });
}]);
