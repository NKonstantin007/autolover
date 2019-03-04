"use strict";

/**
  *  Service of the Vigenere cipher
  */
angular.module("services").factory("vigenerModel", function() {
    return {
        /**
          * Method of encrypting alphabetic text by using a series of interwoven Caesar ciphers
          * @param {string} text - text to be encrypted
          * @param {string} key - encryption key
          */
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
