/* global angular */
angular.module("SOS08ManagerApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider.when("/", {
            templateUrl: "main.html"
        })
        .when("/analytics", {
            templateUrl: "analytics.html"
        })

    .when("/wages", {
            templateUrl: "angularWages/list.html",
            controller: "WagesListCtrl"
        })
        .when("/wages/:province/:year", {
            templateUrl: "/angularWages/edit.html",
            controller: "WagesEditCtrl"
        })
        .when("/wages/graph", {
            templateUrl: "/angularWages/graph.html",
            controller: "WagesGraphCtrl"
        });

    console.log("App initialized and configured");
});
