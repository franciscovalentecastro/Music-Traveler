$(document).ready( function(){ initialize(); });

var initialize = function(){
	man = new DataManager();
	man.getSong("Malegria","Manu Chao",tes);
}

function tes( resArray){
	alert("Yeah");
	console.debug(resArray);
}

