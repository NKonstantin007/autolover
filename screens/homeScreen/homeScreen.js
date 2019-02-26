'use strict'

angular.module("controllers").controller("homeScreenController", function($scope, userModel) {
	function init() {
		$scope.showSignupBtn = userModel.isAuth();
	}

	init();
});