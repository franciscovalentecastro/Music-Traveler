/* Object Collection*/
var Map = function(var objHTML,var mapOptions){

	this.googleMap = new google.maps.Map(objHTML,mapOptions);
	this.mapOptions = mapOptions;
	this.markerCollection = new Array(0);
	this.routeCollection = new Array(0);
	
	this.newMarker = function(var position){
		this.markerCollection.push( new Marker( {  LatLng: position } , { content:"Test" } )  );
		this.markerCollection[ this.markerCollection.length ].googleMarker.setMap(this.googleMap);	
	}
	
	this.newRoute = function(var origin, var destination,var travelMode){
		this.routeCollection.push( new Route( {  origin:origin, destination:destination, travelMode:travelMode}); );
		this.routeCollection[ this.routeCollection.length ].directionsRenderer.setMap(this.googleMap);	
	}
				
}

var Marker = function(var markerOptions,var infoOptions){
	/* Propiedades*/
	this.googleMarker = 	new google.maps.Marker(markerOptions);
	this.googleInfoWindow = new google.maps.InfoWindow(infoOptions);
	
	this.markerOptions = markerOptions;	
	this.infoOptions = infoOptions;	
		
	
	/* Metodos*/
	this.onClick = function(){
		this.googleInfoWindow.open(markerOptions.map);	
	}		
	
	google.maps.event.addListener(this.googleMarker,"click",this.onClick);
	
}

var Route = function(var routeOptions){
	this.directionsService = new google.maps.DirectionsService();
	
	this.directionsRenderer = new google.maps.DirectionsRenderer();
	
	this.routeOptions = routeOptions;
	
	this.directionsService(routeOptions,function(var result,var status){
			if (status == google.maps.DirectionsStatus.OK) {
      		this.directionsRenderer.setDirections(result);
    		}
		});	
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