'use strict'

angular.module("components").component("content", {
	templateUrl: "components/content/content.html",
	bindings: {
        items: "<"
    },
    controller: function($scope, $location, $anchorScroll) {

    	$scope.goToItem = function(id) {
    		$location.hash(id);
    		$anchorScroll();
    	}
    }
});