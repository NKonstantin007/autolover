'use strict'

/**
  * Component that show author of article and publication date
  */
angular.module("components").component("articleInfo", {
	templateUrl: "components/articleInfo/articleInfo.html",
	bindings: {
        info: "<"	/// object containing author of article and publication date
    }
});