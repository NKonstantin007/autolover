	"use strict";

angular.module("services").factory("numberModel", function() {
    let model = {
        getRandomInt: function(min, max) {
        	return Math.floor(Math.random() * (max - min)) + min;
        }
    };

    return {
    	getRandomInt: function(min, max) {
        	return Math.floor(Math.random() * (max - min)) + min;
        },
		getRandomBigInteger: function(rank) {
	        var result = "";
		    for (var i = 1; i < rank; i++)
		    {
		        result += this.getRandomInt(0, 9);
		    }
		    return result;
	    },
		getRandomPrimitiveNumber: function(rank) {
	        var number;
		    do 
		    {
		        number = bigInt(this.getRandomBigInteger(rank));
		    }while (!number.isProbablePrime());
		    return number;
	    },
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