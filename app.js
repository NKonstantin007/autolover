"use strict";

angular.module("services", []);					/// services module
angular.module("components", ["ngSanitize"]);	/// components module		
angular.module("controllers", ["services"]);	/// controllers module
/// application module
angular.module("app", ["components", "controllers", "services", "ngRoute", "ngCookies"]);
/**
  *  Run-function - is executed after all of the service have been configured and the injector has been created
  */
angular.module("app").run(["$cookies", "jqSignService", "jqGenerateCloseKeyService", "userModel", "vigenerModel", "numberModel", "$rootScope", "$location", 
	function($cookies, jqSignService, jqGenerateCloseKeyService, userModel, vigenerModel, numberModel, $rootScope, $location){
		var user = $cookies.getObject("autoloverUser");		/// get cookies with user data
		/// if user data there is in cookies
		if(angular.isDefined(user)) {

			/// create large and simple numbers
			var p = numberModel.getRandomPrimitiveNumber(26);
			var g = numberModel.getPrimitiveRootModule(p, 26);
			/// get the numbers a and A as if we are Alice
			var a = numberModel.getRandomBigInteger(25);
			var A = g.modPow(a, p);
			/// send data to Bob to get number B
			var obj={
				"p": p.toString(),
				"g": g.toString(),
				"A": A.toString()
			};
			var B = 0; /// the number we get from Bob in return
			jqGenerateCloseKeyService.getB(obj).then(
				function(data) {
					B = bigInt(data["B"]);
					var closeKey = B.modPow(a, p).toString(); /// create lose key
					signin(closeKey);						  /// user sign in
				}
			);
		}

		/**
 		  * Sign in user
 		  * @param {BigInteger} key - close key in Diffie–Hellman's ptotocol
 		  */
		function signin(key) {
			/// create the object to send to the server
			var obj = {
				login: vigenerModel.encryptVigener(user.login, key).toLowerCase(), 			/// encrypt login
				password: vigenerModel.encryptVigener(user.password, key).toLowerCase() 	/// encrypt password
			};
			/// sign in user using service
			jqSignService.signin(obj).then(
				function(data) {
					var result = data;
					///if authorization is successful
					if(result == "success") {
						userModel.setUser(user.login);		/// set userModel
						$rootScope.$emit("user-changed");	/// emit event for change design of header
					}	
				}
			);
		}
	}
]);

