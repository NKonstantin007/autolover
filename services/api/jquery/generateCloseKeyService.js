"use strict";

/**
  *  Api service using jQuery for generation of close key by Diffie–Hellman's ptotocol
  */
angular.module("services").factory("jqGenerateCloseKeyService", function(jqBaseService) {

    return {
        /**
          * Send data to Bob to get number B
          * @param {object} obj - object with large and simple numbers (number p, number g, number A)
          * @return {object} - promise object with standard 'then' method
          */
        getB: function(obj) {
            return jqBaseService.getPromise({
                type: "POST",
                url: "php/generateCloseKey.php",
                dataType: 'json',
                data: "param="+JSON.stringify(obj)
            });
        }
    }
});
