/* global angular */
angular.module("SOS08ManagerApp", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider.when("/", {
            templateUrl: "main.html"
        })
        .when("/analytics", {
            templateUrl: "analytics.html",
            controller:"ChartsComunCtrl"
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
            templateUrl: "angularWages/GraphCors.html",
            controller: "WagesRemoteGraphCtrl"
        })
        .when("/wages/GraphProxy", {
            templateUrl: "angularWages/GraphProxy.html",
            controller: "WagesProxyGraphCtrl"
            
        }).when("/victims/GraphRemote", {
            templateUrl: "angularVictims/GraphRemote.html",
            controller: "VictimsRemoteGraphCtrl"
        })
        .when("/wages/apiexterna1", {
            templateUrl: "/angularWages/apiexterna1.html",
            controller: "ApiExterna1ChartCtrl"
        })
        
        .when("/wages/apiexterna2", {
            templateUrl: "/angularWages/api-externa2.html",
            controller: "ApiExterna2ChartCtrl"
        })
        .when("/governance", {
            templateUrl: "/governance.html",
            
        }) 
        .when("/integrations", {
            templateUrl: "/integrations.html",
            
        })    
        .when("/victims/GraphProxy", {
            templateUrl: "angularVictims/GraphProxy.html",
            controller: "VictimsProxyGraphCtrl"
            
        })
        .when("/about", {
            templateUrl: "about.html"
            
        })
         .when("/governance", {
            templateUrl: "governance.html"
            
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

    console.log("App initialized and configureddd");
});
