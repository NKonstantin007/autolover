'use strict'

angular.module("components").component("slider", {
	templateUrl: "components/slider/slider.html",
	bindings: {
        label: "@"
    },
	controller: function($scope, $interval) {
		this.$onInit = function() {
			$scope.slideIndex = 1;	// номер слайда
			$scope.amountImage = 3	// кол-во изображений в слайдере
			$scope.numberImage = "1/3";
			jQuery.fx.speeds.fast = 300; // изменяем время в системной переменной в JQuery
			$scope.showSlides();
			$scope.promiseInterval = $interval($scope.showSlides, 8000);
		};

		this.$onDestroy = function() {
			$interval.cancel($scope.promiseInterval);
		};
		$scope.showSlides = function() {
			var slide = $(".slideshow img");
			slide.animate({opacity: 0.2}, "fast");

			// если счетчик больше 3 то присваеваем ему снова 1
			if($scope.slideIndex > $scope.amountImage)
			{
				$scope.slideIndex = 1;
			}
			// первое изображение
			if($scope.slideIndex == 1)
			{                	
				slide.attr("src", "images/mersedes.jpg"); // меняем изображение
				$scope.numberImage = "1/3";					 // меняем номер изображения			
				slide.animate({"opacity":1}, 2000);          // создаем эффект постепенного появления
			}
			// второе изображение
			if($scope.slideIndex == 2)
			{
				slide.attr("src", "images/subaru.jpg");
				$scope.numberImage = "2/3";
				slide.animate({"opacity":1}, 2000);
			}
			// третье изображение
			if($scope.slideIndex == 3)
			{
				slide.attr("src", "images/bmw.jpg");
				$scope.numberImage = "3/3"; 
				slide.animate({"opacity":1}, 2000);
			}
			// инкрементируем номер изоражения
			$scope.slideIndex++;
		}
	}
});