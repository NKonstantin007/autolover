'use strict'

angular.module("components").component("articleTitle", {
	templateUrl: "components/articleTitle/articleTitle.html",
	bindings: {
        tab: "<",
        title: "@"
    }
});