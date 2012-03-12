/* Object Collection*/
var Map = function(){
	this.googleMap;
	this.options;
	this.markerCollection;
	this.route.Collection;
	
	this.newMarker = function(){
	
	}
	
	this.newRoute = function(){
	
	}
				
}

var Marker = function(){
	this.LatLng;
	this.info;
	this.title;
	this.place;
	this.icon;
	this.infoWindow;
}

var Route = function(){
	this.directions;
	this.speed;
	this.color;
}

var InfoWindow =  function(){
	this.content;
	this.offset;
}

var MultimediaPlayer = function(){
	this.size;
	this.type;
	this.title;
	this.source;
}

var Artist = function(){
	this.name;
	this.origin;
	this.LatLng;
	this.genre;
	this.songs;
}

var Search = function(){
	this.byName = function()[
	}
	
	this.byGenre =	function(){
	}
	
	this.byPopularity = function(){
	}
	
	this.byPlace= function(){
	}					
	
	this.byFiltered = function(){
	}	
	
	var Freebase = function(){
	}
	
	var Wikipedia = function(){
	
	}		
}