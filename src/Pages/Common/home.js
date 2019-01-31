var HomeApp = angular.module('HomeApp', ['ngRoute']); 

HomeApp.config(['$routeProvider', 
function ($routeProvider) {
    $routeProvider
    .when('/Registration', { templateUrl: '../Pages/Registration/Registration.html' })
    .when('/Login', { templateUrl: '../Pages/Login/Login.html' })
    .when('/Frontend', { templateUrl: '../Pages/Frontend/Frontend.html' })
    .when('/CSharp', { templateUrl: '../Pages/CSharp/CSharp.html' })
    .when('/Database', { templateUrl: '../Pages/Database/Database.html' })
    .when('/Implementation/:id?', { templateUrl: '../Pages/Implementation/Implementation.html' })
    ;
}]).
run(function ($rootScope) {

    
});