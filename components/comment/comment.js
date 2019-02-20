'use strict'

angular.module("components").component("comment", {
	templateUrl: "components/comment/comment.html",
	bindings: {
        messages: "<"
    }
});