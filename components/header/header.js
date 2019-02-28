'use strict'

angular.module("components", ).component("appHeader", {
	templateUrl: "components/header/header.html",
	controller: function($scope, $rootScope, $location, jqSignService, userModel, $cookies) {
		this.$onInit = function() {

			$scope.isShowHeader = true;
			$scope.isSignin = false;
			$scope.signinBtn = "Войти";
			if(userModel.user != null) {
				$scope.isSignin = true;
				$scope.userHtml = "<i class='glyphicon glyphicon-user'>" + userModel.user + "</i>";
				$scope.signinBtn = "Выйти";
			}
			else {
				$scope.isSignin = false;
				$scope.signinBtn = "Вoйти";
			}
		};

		$scope.signinOrOut = function() {
			
			if($scope.isSignin) {
				jqSignService.signout().then(
					function(data) {
						userModel.clear();
						$scope.isSignin = false;
						$scope.signinBtn = "Вoйти";
						$cookies.remove("autoloverUser");
						$location.path("#!/signin");
					},
					function( req, status, err ) {
						console.log( 'что-то пошло не так', status, err );
				    }
				);
			}
			else {
				$location.path("signin");
			}
		}

		$rootScope.$on("user-changed", function(event, data) {
			if(userModel.user != null) {
				$scope.isSignin = true;
				$scope.userHtml = "<i class='glyphicon glyphicon-user'>" + userModel.user + "</i>";
				$scope.signinBtn = "Выйти";
			}
		});

		$rootScope.$on("show-header", function(event, data) {
			$scope.isShowHeader = data;
		})
	}
});