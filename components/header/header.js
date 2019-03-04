'use strict'

/**
  * Component header
  */
angular.module("components", ).component("appHeader", {
	templateUrl: "components/header/header.html",
	controller: function($scope, $rootScope, $location, jqSignService, userModel, $cookies) {
		/**
 		  * Method for initialization of controller
 		  */
		this.$onInit = function() {

			$scope.isShowHeader = true;		/// show header
			/// if user is sign in
			if(userModel.user != null) {
				$scope.isSignin = true;																	/// set user is sign in
				$scope.userHtml = "<i class='glyphicon glyphicon-user'>" + userModel.user + "</i>";		/// set login of user
				$scope.signinBtn = "Выйти";																/// set content of sign in or out button
			}
			else {
				$scope.isSignin = false;		/// set user is not sign in
				$scope.signinBtn = "Вoйти";		/// /// set content of sign in or out button
			}
		};

		/**
 		  * Method uses for sign in or out user
 		  */
		$scope.signinOrOut = function() {
			/// if user is sign in
			if($scope.isSignin) {
				/// sign out user
				jqSignService.signout().then(
					function(data) {
						userModel.clear();
						$scope.isSignin = false;			/// clear userModel
						$scope.signinBtn = "Вoйти";			/// set content of sign in or out button
						$cookies.remove("autoloverUser");	/// remove cookies with user data
						$location.path("signin");			/// go to page of sign in
					}
				);
			}
			else {
				$location.path("signin");	/// go to page of sign in
			}
		}
		/**
 		  * Catch events of change of the authorization user data
 		  */
		$rootScope.$on("user-changed", function(event, data) {
			/// if user is sign in
			if(userModel.user != null) {
				$scope.isSignin = true;																	/// set user is sign on
				$scope.userHtml = "<i class='glyphicon glyphicon-user'>" + userModel.user + "</i>";		/// set login of user
				$scope.signinBtn = "Выйти";																/// set content of sign in or out button
			}
		});
		/**
 		  * Catch events of showing of header
 		  */
		$rootScope.$on("show-header", function(event, data) {
			$scope.isShowHeader = data;
		})
	}
});