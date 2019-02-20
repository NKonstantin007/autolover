angular.module("services").factory("angFordChatService", function(angBaseService) {

    return {
        sendMessage: function(obj) {
            return angBaseService.getPromise({
                method: "GET",
                url: "php/chatik1.php",
                params: {
                    newMsg: obj
                }
            });
        },
        getAllMessages: function() {
            return angBaseService.getPromise({
                method: "GET",
                url: "php/chatik1.php",
                params: {
                    allMsg: 1
                }
            });
        }
    }
});