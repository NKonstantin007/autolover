"use strict";

angular.module("services", []);
angular.module("components", ["ngSanitize"]);
angular.module("controllers", ["services"]);

angular.module("app", ["components", "controllers", "services", "ngRoute", "ngCookies"]);

angular.module("app").run(["$cookies", "jqSignService", "userModel", "vigenerModel", "$rootScope", function($cookies, jqSignService, userModel, vigenerModel, $rootScope){
	var key = "autolover";	// ключ шифрования логина и пароля шифром Вижинера
	var user = $cookies.getObject("autoloverUser");
	if(angular.isDefined(user)) {
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
}]);