"use strict";

angular.module("services", []);
angular.module("components", ["ngSanitize"]);
angular.module("controllers", ["services"]);

angular.module("app", ["components", "controllers", "services", "ngRoute", "ngCookies"]);

angular.module("app").run(["$cookies", "jqSignService", "jqGenerateCloseKeyService", "userModel", "vigenerModel", "numberModel", "$rootScope", "$location", 
	function($cookies, jqSignService, jqGenerateCloseKeyService, userModel, vigenerModel, numberModel, $rootScope, $location){
		var user = $cookies.getObject("autoloverUser");
		if(angular.isDefined(user)) {

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

		function signin(key) {
			// получаем объект для отправки на сервер
			var obj = {
				login: vigenerModel.encryptVigener(user.login, key).toLowerCase(), // шифруем логин
				password: vigenerModel.encryptVigener(user.password, key).toLowerCase() // шифруем пароль
			};

			jqSignService.signin(obj).then(
				function(data) {
					var result = data;
					if(result == "success") {
						userModel.setUser(user.login);
						$rootScope.$emit("user-changed");
					}	
				}
			);
		}
	}
]);

