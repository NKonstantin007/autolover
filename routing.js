"use strict";

angular.module("app").config(["$routeProvider", function ($routeProvider) {
	$routeProvider.when("/home", {
		templateUrl: "screens/homeScreen/homeScreen.html",
		controller: "homeScreenController"
	});

	$routeProvider.when("/signup", {
		templateUrl: "screens/signupScreen/signupScreen.html",
		controller:"signupScreenController"
	});

	$routeProvider.when("/signin", {
		templateUrl: "screens/signinScreen/signinScreen.html",
		controller:"signinScreenController"
	});

	$routeProvider.when("/allcars", {
		templateUrl: "screens/allAboutCarsScreen/allAboutCarsScreen.html",
		controller: "allAboutCarsScreenController"
	});

	$routeProvider.when("/facts", {
		templateUrl: "screens/factsScreen/factsScreen.html",
		controller:"factsScreenController"
	});

	$routeProvider.when("/reviews", {
		templateUrl: "screens/reviewsScreen/reviewsScreen.html",
		controller: "reviewsScreenController"
	});

	$routeProvider.when("/reviews/fordfocus3", {
		templateUrl: "screens/reviewsScreen/articles/fordFocusThreeScreen/fordFocusThreeScreen.html",
		controller: "fordFocusThreeScreenController"
	});

	$routeProvider.when("/allcars/whatisengine", {
		templateUrl: "screens/allAboutCarsScreen/articles/whatIsEngineScreen/whatIsEngineScreen.html",
		controller: "whatIsEngineScreenController"
	});

	$routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);