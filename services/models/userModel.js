"use strict";

/**
  *  Service with user settings
  */
angular.module("services").factory("userModel", function() {
    let model = {
        user: null
    };
    /**
      * Set a new authorized user
      * @param {string} user - login of user
      */
    model.setUser = function(user) {
        model.user = user;
    };
    /**
      * Clear an user of site when user has signed out
      */
    model.clear = function() {
        model.user = null;
    };
    /**
      * Сheck user authorization
      * @return {boolean} - true if user is sign in
      */
    model.isAuth = function() {
        return model.user != null;
    }

    return model;
});
