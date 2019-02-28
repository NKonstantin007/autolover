'use strict'

angular.module("components").component("zoomingImage", {
	templateUrl: "components/zoomingImage/zoomingImage.html",
	bindings: {
        src: "@",
        discription: "@",
        onClick: "&"
    },
	controller: function($scope) {

		var onClick = null;
		var src = null;
		var discription = null;
		
		$scope.clickImage = function() {
			console.log(src);
			console.log(discription);
			onClick({
				src: src,
				discription: discription
			});
		}

		this.$onInit = function() {
			onClick = this.onClick;
			src = this.src;
			discription = this.discription;
		}
	}
});