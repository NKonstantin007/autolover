'use strict'

/**
  * Screen tab - "Вход" 
  */
angular.module("controllers")
	.controller("signinScreenController", function($scope, $location, jqSignService, $cookies, userModel,
		numberModel, vigenerModel, jqGenerateCloseKeyService) {

		/**
 		  * Method for initialization
 		  */
		function init() {
			$scope.user = {
				login: "",
				password: "",
			};
		}
 
		init();

		/**
		  * reset error slyle of inputs
		  */
		function resetInput() {
			$scope.loginIsError = false;		/// reset login
			$scope.passwordIsError = false;		/// reset password
		}
		/**
		  * Validation of forms for authorization
		  * @return {string} name of the error
		  */
		function validate() {
			/// Before validation, the input error styles are reset.
			resetInput();

			var fail = true /// stores the name of the error
			const pattern = /[^0-9a-z]/i;   /// RegExp to validate the input of valid characters

			/// check login for emptiness
			if($scope.user.login.trim() == "") {
				fail = "Вы не ввели логин";
				$scope.loginIsError = true;
				return fail;
			} 
			/// check login for compliance with the pattern
			else if(pattern.test($scope.user.login.trim())) {
				fail = "Логин содержит недопустимые символы";
				$scope.loginIsError = true;
				return fail;
			} 
			/// check password for emptiness
			else if($scope.user.password.trim() == "") {
				fail = "Вы не ввели пароль";
				$scope.passwordIsError = true;
				return fail;
			} 
			/// check password for length
			else if($scope.user.password.trim().length < 6) {
				fail = "Слишком короткий пароль";
				$scope.passwordIsError = true;
				return fail;
			}
			/// check password for compliance with the pattern
			else if(pattern.test($scope.user.password.trim())) {
				fail = "Пароль содержит недопустимые символы";
				$scope.passwordIsError = true;
				return fail;
			}
			return fail;
		}

		/**
 		  * Sign in user using Diffie–Hellman's ptotocol
 		  */
		$scope.signinUser = function() {

			var result = validate();	/// validation of the form
			/// if there is an error
			if(result != true) {
				$scope.message = "<b>Ошибка! </b>" + result;	/// set text error message 
			}
			else {

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
						var closeKey = B.modPow(a, p).toString();	/// create lose key
						signin(closeKey);							/// user sign in
					}
				);
			}
		}

		/**
 		  * Sign in user
 		  * @param {BigInteger} key - close key in Diffie–Hellman's ptotocol
 		  */
		function signin(key) {
			/// create the object to send to the server
			var obj = {
				login: vigenerModel.encryptVigener($scope.user.login, key).toLowerCase(), 			/// encrypt login
				password: vigenerModel.encryptVigener($scope.user.password, key).toLowerCase()		/// encrypt password
			};
			/// sign in user using service
			jqSignService.signin(obj).then(
				function(data) {
					var result = data;
					///if authorization is successful
					if(result == "success") {
						$cookies.putObject("autoloverUser", $scope.user);	/// set cookies with user data
						userModel.setUser($scope.user.login);				/// set userModel
						$scope.$emit("user-changed");						/// emit event for change design of header
						$location.path("/home");							/// go to main page of site
					}
					else {
						/// set text error message 
						$scope.message = "<b>Ошибка! </b>" +  
							"Пользователя с таким паролем и логином не существует. Возможно данные введены неправильно";
					}
				}
			);
		}
});