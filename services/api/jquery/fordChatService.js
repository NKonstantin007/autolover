angular.module("services").factory("jqFordChatService", function(jqBaseService) {

    return {
        sendMessage: function(obj) {
            return jqBaseService.getPromise({
                type: "POST",
                url: "php/chatik1.php",
                data: "newMsg="+JSON.stringify(obj)
            });
        },
        getAllMessages: function() {
            return jqBaseService.getPromise({
                type: "GET",
                url: "php/chatik1.php",
                dataType: 'json',
                data: "allMsg=1"
            });
        }
    }
});