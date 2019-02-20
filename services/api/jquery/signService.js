"use strict";

angular.module("services").factory("jqSignService", function(jqBaseService) {

    return {
        signout: function() {
            return jqBaseService.getPromise({
                type: "POST",
                url: "php/enter.php",
                data: "exit=1"
            });
        },
        signup: function(obj) {
        	return jqBaseService.getPromise({
        		type: "POST",
        		url: "php/registration.php",
        		data: "user="+JSON.stringify(obj)
        	});
        },
        signin: function(obj) {
            return jqBaseService.getPromise({
                type: "POST",
                url: "php/enter.php",
                data:"user="+JSON.stringify(obj)
            });
        }
    };
});