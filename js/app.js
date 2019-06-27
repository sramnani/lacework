
//Application entry point for the shopping cart

var storeApp = angular.module('LaceworkApp', []).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/store', {
        templateUrl: 'views/store.html',
        controller: storeController
    }).
    when('/cart', {
        templateUrl: 'views/cart.html',
        controller: storeController
    }).
    otherwise({
        redirectTo: '/store'
    });
}]);

