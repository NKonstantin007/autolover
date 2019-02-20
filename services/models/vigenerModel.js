"use strict";

angular.module("services").factory("vigenerModel", function() {
    return {
        encryptVigener: function encryptVigener(text, key) {
            var alphabet = "abcdefghijklmnopqrstuvwxyz1234567890";
            var encrypt_text = "";
            var positionKey = 0;
            for (var i=0;i<text.length;i++)
            {
                encrypt_text = encrypt_text + alphabet[(alphabet.indexOf(text[i]) + alphabet.indexOf(key[positionKey])) % alphabet.length];
                positionKey = (positionKey + 1) % key.length;
            }
            
            return encrypt_text;
        }
    }
});
