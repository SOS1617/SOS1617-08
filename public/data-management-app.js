/* global angular */
angular.module("SOS08ManagerApp", ["ngRoute", "chart.js"]).config(function($routeProvider) {
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
        })

    
    .when("/gdp-per-capita", {
            templateUrl: "gdp-per-capita/list.html",
            controller: "GdpPerCapitaListCtrl"
        })
        .when("/gdp-per-capita/:country/:year", {
            templateUrl: "gdp-per-capita/edit.html",
            controller: "GdpPerCapitaEditCtrl"
        })
        .when("/gdp-per-capita/graph", {
            templateUrl: "gdp-per-capita/graph.html",
            controller: "GdpPerCapitaGraphCtrl"
        });

    console.log("App initialized and configured");
});
