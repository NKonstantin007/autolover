"use strict";

/**
  *  Service for work with number
  */
angular.module("services").factory("numberModel", function() {

    return {
    	/**
          * Create random integer number
          * @param {integer} min - minimum number
          * @param {integer} max - maximum number
          * @return {integer} - random integer number
          */
    	getRandomInt: function(min, max) {
        	return Math.floor(Math.random() * (max - min)) + min;
        },
        /**
          * Create random big integer number
          * @param {integer} rank - amount digits in number
          * @return {string} - random big integer number as a string
          */
		getRandomBigInteger: function(rank) {
	        var result = "";
		    for (var i = 1; i < rank; i++)
		    {
		        result += this.getRandomInt(0, 9);
		    }
		    return result;
	    },
	    /**
          * Create random primitive big integer number
          * @param {integer} rank - amount digits in number
          * @return {string} - random primitive big integer number as a string
          */
		getRandomPrimitiveNumber: function(rank) {
	        var number;
		    do 
		    {
		        number = bigInt(this.getRandomBigInteger(rank));
		    }while (!number.isProbablePrime());
		    return number;
	    },
	    /**
          * Create of simple primitive root modulo
          * @param {BigInteger} x - simple big integer number
          * @param {integer} rank - amount digits in number
          * @return {string} - simple primitive root modulo x
          */
	    getPrimitiveRootModule: function(x, rank) {
	    	var number;
		    do {
		        number = bigInt(this.getRandomBigInteger(rank));
		        var temp = number.modPow(x.prev(), x);
		    }
		    while (!(temp.equals(bigInt(1)) || number.substract(temp).equals(bigInt(1))));
		    return number;
		}
	}
});