"use strict";

/**
  *  Api service using jQuery for operation of registration and authorization
  */
angular.module("services").factory("jqSignService", function(jqBaseService) {

    return {
        /**
          * User sign out method
          * @return {object} - promise object with standard 'then' method
          */
        signout: function() {
            return jqBaseService.getPromise({
                type: "POST",
                url: "php/signinout.php",
                data: "exit=1"
            });
        },
        /**
          * User sign up method
          * @param {object} obj - object with user data (login, password, second password)
          * @return {object} - promise object with standard 'then' method
          */
        signup: function(obj) {
        	return jqBaseService.getPromise({
        		type: "POST",
        		url: "php/signup.php",
        		data: "user="+JSON.stringify(obj)
        	});
        },
        /**
          * User sign in method
          * @param {object} obj - object with user data (login, password)
          * @return {object} - promise object with standard 'then' method
          */
        signin: function(obj) {
            return jqBaseService.getPromise({
                type: "POST",
                url: "php/signinout.php",
                data:"user="+JSON.stringify(obj)
            });
        }
    };
});