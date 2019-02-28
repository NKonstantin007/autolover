'use strict'

angular.module("controllers").controller("whatIsEngineScreenController", function($scope, $anchorScroll) {

		function init() {
			$scope.tab = {
				title: "Все об автомобилях",
				href: "#!/allcars"
			};

			$scope.info = {
				author: "Игорь Красильников",
				date: new Date(2018, 3, 18)
			};

			$scope.isShowModalImage = false;
			$scope.src = null;
			$scope.imageDiscription = null;

			$scope.url = "php/chatik2.php";

			$scope.content = [
			{
				link: "engine",
				title: "Что же такое двигатель?"
			},
			{
				link: "petrol-engine",
				title: "Бензиновый двигатель"
			},
			{
				link: "diesel-engine",
				title: "Дизельный двигатель" 
			},
			{
				link: "rotor-engine",
				title: "Роторный двигатель"
			},
			{
				link: "gas-engine",
				title: "Газовый двигатель"
			}];
		}

		init();

		$scope.showModalImage = function(src, discription) {
			$scope.src = src;
			$scope.imageDiscription = discription;
			$scope.isShowModalImage = true;
			$scope.$emit("show-header", !$scope.isShowModalImage);
		}

		$scope.hideModalImage = function() {
			$scope.isShowModalImage = false;
			$scope.$emit("show-header", !$scope.isShowModalImage);
		}
	});
