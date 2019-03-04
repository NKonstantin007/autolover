'use strict'

/**
  * Component of article content
  */
angular.module("components").component("content", {
	templateUrl: "components/content/content.html",
	bindings: {
        items: "<"    /// items of article content
    },
    controller: function($scope, $location, $anchorScroll) {

        /**
          * Go to item of article
          * @param {string} id - id of content item
          */
    	$scope.goToItem = function(id) {
    		$location.hash(id);
    		$anchorScroll();
    	}
    }
});