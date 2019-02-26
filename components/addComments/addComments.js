'use strict'

angular.module("components").component("addComments", {
	templateUrl: "components/addComments/addComments.html",
	bindings: {
        url: "<"
    },
	controller: function($scope, userModel, jqChatService, $timeout) {
 		$scope.sendMessage = function() {
 			if(userModel.isAuth()) {
 				var message = {
 					author: userModel.user,
 					text: $scope.comment
 				};

 				jqChatService.sendMessage($scope.url, message).then(
 					function(data) {
 						$scope.comment = "";
 						getAllMessages($scope.url);
 					}
				); 
 			}
 			else {
 				$scope.isFirstCommentSend = true;
 			}
 		}

 		this.$onInit = function() {
 			$scope.userIsAuth = userModel.isAuth();
			$scope.isFirstCommentSend = false;
			$scope.url = this.url;
			getAllMessages($scope.url);
 		}

 		function getAllMessages(url) {
 			jqChatService.getAllMessages(url).then(
 				function(data) { 
 					$scope.$apply($scope.messages = data); 				
 				}
			);
 		}
	}
});