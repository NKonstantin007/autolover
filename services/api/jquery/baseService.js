'use strict';

/**
  *  Base api service using jQuery
  */
angular.module("services").factory('jqBaseService', function() {	
    return {
         /**
          * Base method for api servers
          * @param {object} config - object describing the request
          * @return {object} - promise object with standard 'then' method
          */
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
