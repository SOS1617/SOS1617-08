/* global angular */

angular.module("SOS08ManagerApp").
controller("GdpPerCapitaGraphCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    console.log("Controller initialized (GdpPerCapitaGraphCtrl)");
    
    if (!$rootScope.apikey) $rootScope.apikey = "secret";
}]);