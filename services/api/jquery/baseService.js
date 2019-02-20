'use strict';

angular.module("services").factory('jqBaseService', function() {	
    return {
        getPromise: function(config) {
            return $.ajax(config).then(
            function(response) {
                return response;
            },
            function( req, status, err ) {
                console.log( 'что-то пошло не так', status, err );
            });
        }
    };
});
