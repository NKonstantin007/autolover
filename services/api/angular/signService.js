"use strict";

angular.module("services").factory("angSignService", function(angBaseService) {

    return {
        checkSignin: function() {
            return angBaseService.getPromise({
                method: "GET",
                url: "php/enter.php",
                params: {
                    login: 1
                }
            });
        },
        signout: function() {
            return angBaseService.getPromise({
                method: "GET",
                url: "php/enter.php",
                params: {
                    exit: 1
                }
            });
        },
        signup: function(obj) {
        	return angBaseService.getPromise({
        		method: "GET",
        		url: "php/registration.php",
        		params: {
                    user: obj
                }
        	});
        },
        signin: function(obj) {
            return angBaseService.getPromise({
                method: "GET",
                url: "php/enter.php",
                params: {
                    user: obj
                }
            });
        }
    };

});