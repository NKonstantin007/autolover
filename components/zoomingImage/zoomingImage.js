'use strict'

/**
  * Component zooming image 
  */
angular.module("components").component("zoomingImage", {
	templateUrl: "components/zoomingImage/zoomingImage.html",
	bindings: {
        src: "@",			/// image path
        discription: "@",	/// image discription
        onClick: "&"		/// method for click by image
    },
	controller: function($scope) {

		var onClick = null;
		var src = null;
		var discription = null;
		
		/**
		  * Zooming of image 
		  */
		$scope.clickImage = function() {
			onClick({
				src: src,
				discription: discription
			});
		}
		/**
 		  * Method for initialization of controller
 		  */
		this.$onInit = function() {
			onClick = this.onClick;
			src = this.src;
			discription = this.discription;
		}
	}
});