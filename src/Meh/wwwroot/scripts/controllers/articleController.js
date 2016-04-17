angular.module('app')
    .controller('ArticleController', function ($scope, articlesResource) {
         articlesResource.query().$promise.then(function(data) {
             $scope.articles = data;
         });
    });