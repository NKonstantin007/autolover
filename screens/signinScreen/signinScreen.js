'use strict'

angular.module("controllers")
	.controller("signinScreenController", function($scope, $location, jqSignService, $cookies, userModel,
		numberModel, vigenerModel, jqGenerateCloseKeyService) {

		function init() {
			$scope.user = {
				login: "",
				password: "",
			};
		}
 
		init();

		function resetInput() {
			$scope.loginIsError = false;
			$scope.passwordIsError = false;
		}

		// Проверка на валиднсть форм при авторизации
		function validate() {
			// перед проверкой сбрасываются стили выделения input и alert
			resetInput();

			var fail = true // хранит название ошибки
			const pattern = /[^0-9a-z]/i;   // RegExp для проверки корректности ввода допустимых символов 	

			// проверка логина на пустоту
			if($scope.user.login.trim() == "") {
				fail = "Вы не ввели логин";
				$scope.loginIsError = true;
				return fail;
			} 
			// проверка логина на соответствие паттерну 
			else if(pattern.test($scope.user.login.trim())) {
				fail = "Логин содержит недопустимые символы";
				$scope.loginIsError = true;
				return fail;
			} 
			// проверка пароля на пустоту
			else if($scope.user.password.trim() == "") {
				fail = "Вы не ввели пароль";
				$scope.passwordIsError = true;
				return fail;
			} 
			// проверка пароля на длинну
			else if($scope.user.password.trim().length < 6) {
				fail = "Слишком короткий пароль";
				$scope.passwordIsError = true;
				return fail;
			}
			// проверка пароля на допустимые символы
			else if(pattern.test($scope.user.password.trim())) {
				fail = "Пароль содержит недопустимые символы";
				$scope.passwordIsError = true;
				return fail;
			}
			return fail;
		}

		$scope.signinUser = function() {

			var result = validate(); // проверка формы на валидность

			if(result != true) {
				$scope.message = "<b>Ошибка! </b>" + result;
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
						signin(closeKey);
					}
				);
			}
		}

		function signin(key) {
			// получаем объект для отправки на сервер
			var obj = {
				login: vigenerModel.encryptVigener($scope.user.login, key).toLowerCase(), // шифруем логин
				password: vigenerModel.encryptVigener($scope.user.password, key).toLowerCase() // шифруем пароль
			};

			jqSignService.signin(obj).then(
				function(data) {
					var result = data;
					if(result == "success") {
						$cookies.putObject("autoloverUser", $scope.user);
						console.log($scope.user.login);
						userModel.setUser($scope.user.login);
						$scope.$emit("user-changed");
						$location.path("/home");
					}
					else {
						$scope.message = "<b>Ошибка! </b>" +  
							"Пользователя с таким паролем и логином не существует. Возможно данные введены неправильно";
					}
				}
			);
		}
});