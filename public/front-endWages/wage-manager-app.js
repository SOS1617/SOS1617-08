angular.module("WageManagerApp",["ngRoute"]).config(function ($routeProvider) {
    
    $routeProvider.when("/",{
        templateUrl : "/front-endWages/list.html",
        controller : "RobertoListCtrl"
        
    })
    .when("/wage/:province/:year",{
        templateUrl : "/front-endWages/edit.html",
        controller : "RobertoEditCtrl"
        
    });
        console.log("App Initialized and configured");
});
