"use strict";

angular.module("services").factory("userModel", function() {
    let model = {
        user: null
    };

    model.setUser = function(user) {
        model.user = user;
    };

    model.clear = function() {
        model.user = null;
    };

    model.isAuth = function() {
        return model.user != null;
    }

    return model;
});
