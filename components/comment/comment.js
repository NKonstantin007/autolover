'use strict'

/**
  * Component of comment 
  */
angular.module("components").component("comment", {
	templateUrl: "components/comment/comment.html",
	bindings: {
        messages: "<"	/// comment data(author, text, date)
    }
});