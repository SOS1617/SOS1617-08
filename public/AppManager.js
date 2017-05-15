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
        })
        .when("/wages/GraphRemote", {
            templateUrl: "angularWages/GraphRemote.html",
            controller: "WagesRemoteGraphCtrl"
        })
        .when("/wages/GraphProxy", {
            templateUrl: "angularWages/GraphProxy.html",
            controller: "WagesProxyGraphCtrl"
            
        })
        
        
        .when("/victims", {
            templateUrl: "angularVictims/list.html",
            controller: "VictimsListCtrl"
        })
        .when("/victims/:province/:year", {
            templateUrl: "/angularVictims/edit.html",
            controller: "VictimsEditCtrl"
        })
        .when("/victims/graph", {
            templateUrl: "/angularVictims/graph.html",
            controller: "VictimsGraphCtrl"
        });

    console.log("App initialized and configured");
});
