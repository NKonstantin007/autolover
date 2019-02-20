'use strict'

angular.module("controllers")
	// .config(["jqGenerateCloseKeyServiceProvider", function(jqGenerateCloseKeyServiceProvider) {
	//     jqGenerateCloseKeyServiceProvider.setUrl("php/registration.php");
	// }])
	.controller("signupScreenController", function($scope, jqSignService, numberModel, vigenerModel, jqGenerateCloseKeyService) {

	function init() {
		$scope.newUser = {
			login: "",
			password: "",
			secondPassword: ""
		};
	}

	init();

	function resetInput() {
		$scope.loginIsError = false;
		$scope.passwordIsError = false;
		$scope.secondPasswordIsError = false;
	}


	// Проверка на валиднсть форм при регистрации
	function validate() {
		// перед проверкой сбрасываются стили выделения input и alert
		resetInput();

		var fail = true // хранит название ошибки
		const pattern = /[^0-9a-z]/i;   // RegExp для проверки корректности ввода допустимых символов 	

		// проверка логина на пустоту
		if($scope.newUser.login.trim() == "") {
			fail = "Вы не ввели логин";
			$scope.loginIsError = true;
			return fail;
		} 
		// проверка логина на соответствие паттерну 
		else if(pattern.test($scope.newUser.login.trim())) {
			fail = "Логин содержит недопустимые символы";
			$scope.loginIsError = true;
			return fail;
		} 
		// проверка пароля на пустоту
		else if($scope.newUser.password.trim() == "") {
			fail = "Вы не ввели пароль";
			$scope.passwordIsError = true;
			return fail;
		} 
		// проверка пароля на длинну
		else if($scope.newUser.password.trim().length < 6) {
			fail = "Слишком короткий пароль";
			$scope.passwordIsError = true;
			return fail;
		}
		// проверка пароля на допустимые символы
		else if(pattern.test($scope.newUser.password.trim())) {
			fail = "Пароль содержит недопустимые символы";
			$scope.passwordIsError = true;
			return fail;
		}
		// проверка паролей на равенство
		else if($scope.newUser.password.trim() != $scope.newUser.secondPassword.trim()) {
			fail = "Пароли не совпадают";
			$scope.passwordIsError = true;
			$scope.secondPasswordIsError = true;
			return fail;
		}
		return fail;
	}
	
	$scope.signupUser = function() {

		var key = "autolover";	// ключ шифрования логина и пароля шифром Вижинера
		var result = validate(); // проверка формы на валидность

		if(result != true) {
			$scope.message = "<b>Ошибка! </b>" + result;
			$scope.alertClass = "alert-danger";
		}
		else {

			// формируем большие и простые чила
			var p = numberModel.getRandomPrimitiveNumber(26);
			var g = numberModel.getPrimitiveRootModule(p, 26);
			// получаем числа а и А, как будто мы - Алиса
			var a = numberModel.getRandomBigInteger(25);
			var A = g.modPow(a, p);
			// отправляем данные Бобу для получения числа В
			var obj={
				"p": p.toString(),
				"g": g.toString(),
				"A": A.toString()
			};

			var B = 0; // число которое получим от Боба в ответ
			jqGenerateCloseKeyService.getB(obj).then(
				function(data) {
					B = bigInt(data["B"]);
					var closeKey = B.modPow(a, p).toString(); // получаем закрытый ключ
					signup(closeKey);
				}
			);

			// var obj = {
			// 	login: encryptVigener($scope.newUser.login, key).toLowerCase(), // шифруем логин
			// 	password: encryptVigener($scope.newUser.password, key).toLowerCase() // шифруем пароль
			// };

			// signService.signup(obj).then(
			// 	function(data) {
			// 		var result = data;
			// 		if(result == "success") {
			// 			$scope.alertClass = "alert-success";
			// 			$scope.message = "<b>Поздравляем!</b>" + "Регистрация прошла успешно";
			// 		}
			// 		else {
			// 			$scope.alertClass = "alert-danger";
			// 			$scope.message = "<b>Ошибка! </b>" +  "Пользователь с данным логином уже существует";
			// 		}
			// 	},
			// 	function( req, status, err ) {
			// 		console.log( 'что-то пошло не так', status, err );
			// 	}
			// );
		}
	}

	function signup(key) {
		// получаем объект для отправки на сервер
		var obj = {
			login: vigenerModel.encryptVigener($scope.newUser.login, key).toLowerCase(), // шифруем логин
			password: vigenerModel.encryptVigener($scope.newUser.password, key).toLowerCase() // шифруем пароль
		};

		jqSignService.signup(obj).then(
			function(data) {
				var result = data;
				if(result == "success") {
					$scope.alertClass = "alert-success";
					$scope.message = "<b>Поздравляем!</b>" + "Регистрация прошла успешно";
				}
				else {
					$scope.alertClass = "alert-danger";
					$scope.message = "<b>Ошибка! </b>" +  "Пользователь с данным логином уже существует";
				}
			}
		);
	}
});