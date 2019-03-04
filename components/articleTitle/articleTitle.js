'use strict'

/**
  * Component article title and article way
  */
angular.module("components").component("articleTitle", {
	templateUrl: "components/articleTitle/articleTitle.html",
	bindings: {
        tab: "<",	/// article way		
        title: "@"	/// article title		
    }
});