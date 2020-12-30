(function(){

	

	angular.module('LunchCheck',[])

	.controller('checkItems', checkItems);

	checkItems.$inject = ['$scope'];

	function checkItems($scope){
		$scope.items = "";
		$scope.message = "";

		$scope.check = function(){

			var items = $scope.items.split(",");
			if($scope.items==""){
				$scope.message = "Please Enter Data First";
			}
			else if(items.length<=3){
				$scope.message = "Enjoy!";
			}

			else if(items.length>3){
				$scope.message="Too much!";
			}


			


		}
	}

})();