'use strict'

angular.module("components").component("addComments", {
	templateUrl: "components/addComments/addComments.html",
	controller: function($scope, userModel, jqFordChatService) {
 		$scope.sendMessage = function() {
 			if(userModel.isAuth()) {
 				var message = {
 					author: userModel.user,
 					text: $scope.comment
 				};

 				jqFordChatService.sendMessage(message).then(
 					function(data) {
 						$scope.comment = "";
 						getAllMessages();
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
			getAllMessages();
 		}

 		function getAllMessages() {
 			jqFordChatService.getAllMessages().then(
 				function(data) {
 					// #TODO приходит JSON надо получить объект
 					$scope.messages = data;
 					console.log($scope.messages);
 				}
			);
 		}
	}
});