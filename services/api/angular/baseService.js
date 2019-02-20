'use strict';

angular.module("services").factory('angBaseService', function($http, $q) {	
    return {
        getPromise: function(config) {
            return $http(config).then(
            function(response) {
                return response.data;
            },
            function(response) {
                return $q.reject(response);
            });
        }
    };
});
