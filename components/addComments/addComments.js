'use strict'

/**
  * Component for adding of article comments 
  */
angular.module("components").component("addComments", {
	templateUrl: "components/addComments/addComments.html",
	bindings: {
        url: "<"	/// server connection URL
    },
	controller: function($scope, userModel, jqChatService, $timeout) {
		/**
          *  Submit a message to server  
		  */
 		$scope.sendMessage = function() {
 			/// if the user is sign in
 			if(userModel.isAuth()) {
 				/// creation of message object for sending on server
 				var message = {
 					author: userModel.user,    /// login
 					text: $scope.comment       /// text of message
 				};
 				/// submit a message using service
 				jqChatService.sendMessage($scope.url, message).then(
 					function(data) {
 						$scope.comment = "";			/// clear the add comment textarea
 						getAllMessages($scope.url);		/// get all messages
 					}
				); 
 			}
 			else {
 				$scope.isFirstCommentSend = true;	/// user has already clicked an add comment button one times
 			}
 		}
 		/**
 		  * Method for initialization of controller
 		  */
 		this.$onInit = function() {
			$scope.isFirstCommentSend = false;	/// user hasn't clicked an add comment button one times
			$scope.url = this.url;				/// server connection URL
			getAllMessages($scope.url);			/// get all messages
 		}

 		/**
 		  * Get all article's messages
 		  * @param {string} url - server connection URL
 		  */
 		function getAllMessages(url) {
 			jqChatService.getAllMessages(url).then(
 				function(data) { 
 					$scope.$apply($scope.messages = data); 				
 				}
			);
 		}
	}
});