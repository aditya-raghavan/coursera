(function(){
	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.directive('foundItems',FoundItems);

	function FoundItems(){
		var ddo = {
			templateUrl: 'founditems.html',
			scope : {
				found : '<',
				onRemove: '&'
			},
			controller: founditemscontroller,
		    controllerAs: 'ctrl',
		    bindToController: true

		};
		return ddo;

	}

	function founditemscontroller(){
		var ctrl = this;
	}
	

	NarrowItDownController.$injector = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService){

		var ctrl = this;

		

		

		

		ctrl.search = function(searchTerm){

			var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
			
			promise.then(function(response){

				ctrl.found = response;
				
			})
			.catch(function(error){
				console.log("Terribly wrong! ");
			})


			
		};

		ctrl.removeItem = function(index){
			ctrl.found = MenuSearchService.removeItem(index);
		};



	}

	MenuSearchService.$injector = ['$http'];
	function MenuSearchService($http){

		var service = this;
		service.founditems = [];

		service.getMatchedMenuItems = function(searchTerm){
			 return $http({
				method: "GET",
				url: "https://davids-restaurant.herokuapp.com/menu_items.json"
			})
			.then(function(response){
				service.items = response.data.menu_items;
				console.log(service.items);
				
				var temparray = [];
				var i;
				for(i=0;i<service.items.length;i=i+1){
					var name = service.items[i].name;
					
					
					if (name.toLowerCase().indexOf(searchTerm) !== -1){
				       temparray.push(service.items[i]);
				    }

				}
				
				service.founditems = temparray;
				console.log(service.founditems);
				return service.founditems;
			})
			.catch(function (error) {
      			console.log("Something went terribly wrong!");
    		})



		};

		service.removeItem = function(index){
			service.founditems.splice(index,1);
			return service.founditems;
		}
	}
})();