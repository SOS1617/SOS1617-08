angular.module("WageManagerApp",["ngRoute"]).config(function ($routeProvider) {
    
    $routeProvider.when("/",{
        templateUrl : "/front-endWages/list.html",
        controller : "ListCtrl"
        
    })
    .when("/wage/:province",{
        templateUrl : "/front-endWages/edit.html",
        controller : "EditCtrl"
        
    });
        console.log("App Initialized and configured");
});
