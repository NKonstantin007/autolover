'use strict'

/**
  * Component button for go up page
  */
angular.module("components").component("buttonToTop", {
	templateUrl: "components/buttonToTop/buttonToTop.html",
	controller: function ($scope, $window, $document) {
		var $btnToTop = $(".btn-to-top");	/// button jQuery object
		/// scroll page event handling
		$($window).on("scroll", function(){
			/// if the user is lower than the middle of the page in height
			if($($window).scrollTop() >= $($document).height()/2) {
				$btnToTop.fadeIn();    /// show button
			}
			else {
				$btnToTop.fadeOut();    /// hide button
			}
		});

		/**
		  *  Go to top of page gradually
		  */
		$scope.goToTop = function() {
			$("html, body").animate({scrollTop: 0}, 1000);
		}
	}
});