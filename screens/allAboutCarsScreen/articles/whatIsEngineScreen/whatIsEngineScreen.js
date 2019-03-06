'use strict'

/**
  * Screen article - "Виды двигателей автомобиля" 
  */
angular.module("controllers").controller("whatIsEngineScreenController", function($scope, $anchorScroll) {

		/**
 		  * Method for initialization
 		  */
		function init() {
			/// tab in which the article is located
			$scope.tab = {
				title: "Все об автомобилях",
				href: "#!/allcars"
			};
			/// information about article
			$scope.info = {
				author: "Игорь Красильников",
				date: new Date(2018, 3, 18)
			};

			$scope.isShowModalImage = false;	/// modal image does not show
			$scope.src = null;					/// image path
			$scope.imageDiscription = null;		/// image discription

			$scope.url = "php/engineChat.php";		/// server connection URL
			/// content of the article
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

		/**
 		  * Show modal image that user clicked
 		  * @param {string} src - image path
 		  * @param {discription} - image discription
 		  */
		$scope.showModalImage = function(src, discription) {
			$scope.src = src;										/// set image path
			$scope.imageDiscription = discription;					/// set image discription
			$scope.isShowModalImage = true;							/// show modal image
			$scope.$emit("show-header", !$scope.isShowModalImage);	/// hide header
		}

		/**
 		  * Hide modal image if user clicked on cross symbol
 		  */
		$scope.hideModalImage = function() {
			$scope.isShowModalImage = false;						/// hide modal image
			$scope.$emit("show-header", !$scope.isShowModalImage);	/// show header
		}
	});
