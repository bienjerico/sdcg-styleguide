var HomeApp = angular.module('HomeApp', ['ngRoute',
]); 

HomeApp.config(['$routeProvider', 
function ($routeProvider) {
    $routeProvider
    .when('/Registration', { templateUrl: '../Pages/Registration/Registration.html' })
    .when('/Login', { templateUrl: '../Pages/Login/Login.html' })
    ;
}]).
run(function ($rootScope) {

    
});