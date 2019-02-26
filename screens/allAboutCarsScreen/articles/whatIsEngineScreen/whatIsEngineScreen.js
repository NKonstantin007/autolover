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
});
