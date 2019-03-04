'use strict'

angular.module("components").component("buttonToTop", {
	templateUrl: "components/buttonToTop/buttonToTop.html",
	controller: function ($scope, $window) {
		var $btnToTop = $(".btn-to-top");
		$($window).on("scroll", function(){
			
			if($($window).scrollTop() >= $(document).height()/2)
			{
				$btnToTop.fadeIn();
			}
			else
			{
				$btnToTop.fadeOut();
			}
		});

		$scope.goToTop = function() {
			$("html, body").animate({scrollTop: 0}, 1000);
		}
	}
});