'use strict'

angular.module("controllers").controller("fordFocusThreeScreenController", function($scope, $anchorScroll) {

	function init() {
		$scope.tab = {
			title: "Обзоры автомобилей",
			href: "#!/reviews"
		};

		$scope.info = {
			author: "Андрей Булычев",
			date: new Date(2017, 6, 5)
		};

		$scope.content = [
		{
			link: "Ford_Focus",
			title: "Ford Focus III"
		},
		{
			link: "Duratec_1.6",
			title: "Двигатель Duratec 1.6"
		},
		{
			link: "Duratec_2.0",
			title: "Новый движок Focus 3 Duratec 2.0" 
		},
		{
			link: "gearbox",
			title: "Коробка передач"
		},
		{
			link: "electric_power",
			title: "Электроусилитель руля"
		},
		{
			link: "cheap_is_not_bad",
			title: "Дешевый – не значит плохой"
		},
		{
			link: "cost",
			title: "Стоит ли?"
		}];
	}

	init();
});
