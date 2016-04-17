'use strict';

angular.module('app')
    .factory('articlesResource', function ($resource) {
        return $resource('api/article/:id', {},
        {
            query: { method: "GET", isArray: true }
        });
    });