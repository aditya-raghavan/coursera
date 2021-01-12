(function (){

	angular.module("shoppingapp",[])
	.controller("ToBuyController",ToBuyController)
	.controller("BoughtController",BoughtController)
	.service("myservice",myservice);

	ToBuyController.$inject = ['myservice'];
	function ToBuyController(myservice){
		var tobuy = this;
		tobuy.items = myservice.gettobuyitems();
		
		this.boughtitem = function(index){
			myservice.checkoff(index);

		}
	}

	BoughtController.$inject = ['myservice'];
	function BoughtController(myservice){
		var bought = this;
		bought.items = myservice.getboughtitems();

	}


	function myservice(){
		var service = this;

		var tobuyitems = [{name:"Apple", quantity:10},{name:"Oranges", quantity:20},{name:"Grapes", quantity:30},{name:"Kiwi", quantity:5},{name:"Papaya", quantity:6}];
		var boughtitems = [];

		service.checkoff = function(index){
			boughtitems.push(tobuyitems[index]);
			
			tobuyitems.splice(index,1);
		}

		service.gettobuyitems = function(){
			return tobuyitems;
		}

		service.getboughtitems = function(){
			return boughtitems;
		}


	}







})();