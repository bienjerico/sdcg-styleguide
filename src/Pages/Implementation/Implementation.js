angular.module('HomeApp').controller('implementationcontroller',
    function ($scope,$location) {
        $scope.init = function () {
            $scope.title = "IMPLEMENTATION";
            console.log($location.path());
        }
    });
