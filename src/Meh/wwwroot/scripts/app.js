angular.module('app', ["ngRoute", "ngResource"]);

angular.module('app').config(function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'views/articles.html', controller: 'ArticleController' });
    $routeProvider.when('/article', { templateUrl: 'views/articles.html', controller: 'ArticleController' });
    $routeProvider.when('/calculator', { templateUrl: 'views/calculator.html', controller: 'calculatorController' });
    $routeProvider.otherwise({redirectTo: '/article'});
});

