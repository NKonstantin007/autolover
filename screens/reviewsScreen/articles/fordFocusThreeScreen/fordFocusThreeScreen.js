'use strict'

/**
  * Screen article - "Подержанный Ford Focus III (2011-2015)" 
  */
angular.module("controllers").controller("fordFocusThreeScreenController", function($scope, $anchorScroll) {

		/**
 		  * Method for initialization
 		  */
		function init() {
			/// tab in which the article is located
			$scope.tab = {
				title: "Обзоры автомобилей",
				href: "#!/reviews"
			};
			/// information about article
			$scope.info = {
				author: "Андрей Булычев",
				date: new Date(2017, 6, 5)
			};

			$scope.url = "php/chatik1.php";		/// server connection URL

			$scope.isShowModalImage = false;	/// modal image does not show
			$scope.src = null;					/// image path
			$scope.imageDiscription = null;		/// image discription
			/// content of the article
			$scope.content = [
			{
				link: "Ford_Focus",
				title: "Ford Focus III"
			},
			{
				link: "Duratec_1_6",
				title: "Двигатель Duratec 1.6"
			},
			{
				link: "Duratec_2_0",
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

		/**
 		  * Show modal image that user clicked
 		  * @param {string} src - image path
 		  * @param {discription} - image discription
 		  */
		$scope.showModalImage = function(src, discription) {
			$scope.src = src;											/// set image path
			$scope.imageDiscription = discription;						/// set image discription
			$scope.isShowModalImage = true;								/// show modal image
			$scope.$emit("show-header", !$scope.isShowModalImage);		/// hide header
		}
		/**
 		  * Hide modal image if user clicked on cross symbol
 		  */
		$scope.hideModalImage = function() {
			$scope.isShowModalImage = false;							/// hide modal image
			$scope.$emit("show-header", !$scope.isShowModalImage);		/// show header
		}
	});
