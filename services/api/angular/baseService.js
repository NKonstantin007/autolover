'use strict';

/**
  *  Base api service using AngularJS
  */
angular.module("services").factory('angBaseService', function($http, $q) {	
    return {
        /**
          * Base method for api servers
          * @param {object} config - object describing the request
          * @return {object} - HttpPromise object with standard 'then' method
          */
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
