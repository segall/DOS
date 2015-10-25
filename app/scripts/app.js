var myApp = angular.module('fdt', ['ngAnimate']);

myApp.controller('GameListCtrl', function ($scope, $http) {
    $http.get('http://localhost:8080/api/games').success(function (data) {
        $scope.games = data.games;
    });

    $scope.orderProp = 'title';
});
