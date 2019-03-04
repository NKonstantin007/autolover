'use strict'

/**
  * Component images slider
  */
angular.module("components").component("slider", {
	templateUrl: "components/slider/slider.html",
	bindings: {
        label: "@"	/// text for page way
    },
	controller: function($scope, $interval) {
		/**
 		  * Method for initialization of controller
 		  */
		this.$onInit = function() {
			$scope.slideIndex = 1;			/// set slide number
			$scope.amountImages = 3			/// set amount of images in slider
			$scope.numberImage = "1/3";		/// set image number
			jQuery.fx.speeds.fast = 300; 	/// change time in system jQuery variable
			$scope.showSlides();			/// launch slider to show the image when you first open the page
			/// launch slider with a period of 8 second
			$scope.promiseInterval = $interval($scope.showSlides, 8000);
		};
		/**
 		  * Method called on a controller when its containing scope is destroyed
 		  */
		this.$onDestroy = function() {
			$interval.cancel($scope.promiseInterval);	/// destroying of interval
		};

		/**
 		  * Changing of images in slider
 		  */
		$scope.showSlides = function() {
			var slide = $(".slideshow img");			/// create jQuery object where image inserts
			slide.animate({opacity: 0.2}, "fast");		/// set opacity to 0.2 fast

			/// if slide number more than 3 
			if($scope.slideIndex > $scope.amountImages)
			{
				$scope.slideIndex = 1;	/// then initialize it again 1
			}
			/// first image
			if($scope.slideIndex == 1)
			{                	
				slide.attr("src", "images/mersedes.jpg"); 
				$scope.numberImage = "1/3";							
				slide.animate({"opacity":1}, 2000); 
			}
			/// second image
			if($scope.slideIndex == 2)
			{
				slide.attr("src", "images/subaru.jpg");
				$scope.numberImage = "2/3";
				slide.animate({"opacity":1}, 2000);
			}
			// third image
			if($scope.slideIndex == 3)
			{
				slide.attr("src", "images/bmw.jpg");
				$scope.numberImage = "3/3"; 
				slide.animate({"opacity":1}, 2000);
			}
			// increment slide number
			$scope.slideIndex++;
		}
	}
});