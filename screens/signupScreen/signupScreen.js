'use strict'

/**
  * Screen tab - "Регистрация" 
  */
angular.module("controllers")
	.controller("signupScreenController", function($scope, jqSignService, numberModel, vigenerModel, jqGenerateCloseKeyService) {

	/**
 	  * Method for initialization
 	  */
	function init() {
		$scope.newUser = {
			login: "",
			password: "",
			secondPassword: ""
		};
	}

	init();

	/**
	   * reset error slyle of inputs
	   */
	function resetInput() {
		$scope.loginIsError = false;			/// reset login
		$scope.passwordIsError = false;			/// reset password
		$scope.secondPasswordIsError = false;	/// reset second password
	}


	/**
	  * Validation of forms for registration
	  * @return {string} name of the error
	  */
	function validate() {
		/// Before validation, the input error styles are reset.
		resetInput();

		var fail = true /// stores the name of the error
		const pattern = /[^0-9a-z]/i;   /// RegExp to validate the input of valid characters	

		/// check login for emptiness
		if($scope.newUser.login.trim() == "") {
			fail = "Вы не ввели логин";
			$scope.loginIsError = true;
			return fail;
		} 
		// check login for compliance with the pattern
		else if(pattern.test($scope.newUser.login.trim())) {
			fail = "Логин содержит недопустимые символы";
			$scope.loginIsError = true;
			return fail;
		} 
		// check password for emptiness
		else if($scope.newUser.password.trim() == "") {
			fail = "Вы не ввели пароль";
			$scope.passwordIsError = true;
			return fail;
		} 
		/// check password for length
		else if($scope.newUser.password.trim().length < 6) {
			fail = "Слишком короткий пароль";
			$scope.passwordIsError = true;
			return fail;
		}
		/// check password for compliance with the pattern
		else if(pattern.test($scope.newUser.password.trim())) {
			fail = "Пароль содержит недопустимые символы";
			$scope.passwordIsError = true;
			return fail;
		}
		/// check password for equal with second password
		else if($scope.newUser.password.trim() != $scope.newUser.secondPassword.trim()) {
			fail = "Пароли не совпадают";
			$scope.passwordIsError = true;
			$scope.secondPasswordIsError = true;
			return fail;
		}
		return fail;
	}
	
	/**
      * Sign up user using Diffie–Hellman's ptotocol
 	  */
	$scope.signupUser = function() {

		var result = validate(); /// validation of the form
		/// if there is an error
		if(result != true) {
			$scope.message = "<b>Ошибка! </b>" + result;	/// set text error message 
			$scope.alertClass = "alert-danger";				/// set class of alert
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
					var closeKey = B.modPow(a, p).toString(); 	/// create lose key
					signup(closeKey);						 	/// user sign up 
				}
			);
		}
	}

	/**
 	   * Sign up user
 	   * @param {BigInteger} key - close key in Diffie–Hellman's ptotocol
 	   */
	function signup(key) {
		/// create the object to send to the server
		var obj = {
			login: vigenerModel.encryptVigener($scope.newUser.login, key).toLowerCase(), 			/// encrypt login
			password: vigenerModel.encryptVigener($scope.newUser.password, key).toLowerCase() 		/// encrypt password
		};
		/// sign up user using service
		jqSignService.signup(obj).then(
			function(data) {
				var result = data;
				switch(result) {
					case "success": 
						$scope.alertClass = "alert-success";										/// set class of alert
						$scope.message = "<b>Поздравляем!</b>" + "Регистрация прошла успешно";		/// set text message
						break;
					case "error":
						$scope.alertClass = "alert-danger";														/// set class of alert
						$scope.message = "<b>Ошибка! </b>" +  "Пользователь с данным логином уже существует";	/// set text message
						break;
					default:
						$scope.alertClass = "alert-danger";																	/// set class of alert
						$scope.message = "<b>Ошибка! </b>" + "Проблемы с сервером. Попробуйте зарегистрироваться позже";	/// set text message
				}
			}
		);
	}
});