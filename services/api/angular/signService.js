"use strict";

/**
  *  Api service using AngularJS for operation of registration and authorization
  */
angular.module("services").factory("angSignService", function(angBaseService) {

    return {
        /**
          * User sign out method
          * @return {object} - HttpPromise object with standard 'then' method
          */
        signout: function() {
            return angBaseService.getPromise({
                method: "GET",
                url: "php/signinout.php",
                params: {
                    exit: 1
                }
            });
        },
        /**
          * User sign up method
          * @param {object} obj - object with user data (login, password, second password)
          * @return {object} - HttpPromise object with standard 'then' method
          */
        signup: function(obj) {
        	return angBaseService.getPromise({
        		method: "GET",
        		url: "php/signup.php",
        		params: {
                    user: obj
                }
        	});
        },
        /**
          * User sign in method
          * @param {object} obj - object with user data (login, password)
          * @return {object} - HttpPromise object with standard 'then' method
          */
        signin: function(obj) {
            return angBaseService.getPromise({
                method: "GET",
                url: "php/signinout.php",
                params: {
                    user: obj
                }
            });
        }
    };

});