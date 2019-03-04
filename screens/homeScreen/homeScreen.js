'use strict'

/**
  * Screen main page of site 
  */
angular.module("controllers").controller("homeScreenController", function($scope, userModel) {

	/**
 	  * Method for initialization
 	  */
	function init() {
		$scope.showSignupBtn = userModel.isAuth();	/// show sign up button
	}

	init();
});