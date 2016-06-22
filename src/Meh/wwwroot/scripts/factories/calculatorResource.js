(function () {
    'use strict';

    angular.module('app')
        .factory('calculatorResource', function ($http) {
            return {
                get: function (action, left, right) {
                    return $http.get('api/calculator/{0}/{1}/{2}' // TODO: move to $resource instead of $http
                        .replace('{0}', action).replace('{1}', left)
                        .replace('{2}', right));
                }
            }
        })
})();