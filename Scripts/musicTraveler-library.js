/* Object Collection*/
var Map = function (objHTML,mapOptions){

	this.googleMap = new google.maps.Map(objHTML,mapOptions);
	this.mapOptions = mapOptions;
	this.markerCollection = new Array(0);
	this.routeCollection = new Array(0);
	
	this.newMarker = function(position){
		this.markerCollection.push( new Marker( {  position: position , map:this.googleMap } , { content:"Test",position:position } )  );
		
	}
	
	this.newRoute = function(origin, destination,travelMode){
		this.routeCollection.push( new Route( {  origin:origin, destination:destination, travelMode:travelMode} ,{map:this.googleMap} ) );
	}
				
}

var Marker = function (markerOptions,infoOptions){
	/* Binding */
	var objSelf = this;
		
	/* Propiedades*/
	this.googleMarker = 	new google.maps.Marker(markerOptions);
	this.googleInfoWindow = new google.maps.InfoWindow(infoOptions);
	
	this.markerOptions = markerOptions;	
	this.infoOptions = infoOptions;			
	
	/* Metodos*/
	this.whenClicked = function(){
		objSelf.googleInfoWindow.open( objSelf.googleMarker.getMap() );	
	}		
	
	google.maps.event.addListener(this.googleMarker,"click", this.whenClicked );
	
}



var Route = function(routeOptions,renderOptions){
	
	/* Binding */
	var objSelf = this;
	
	/*Properties*/
		
	this.directionsService = new google.maps.DirectionsService();
	
	this.directionsRenderer = new google.maps.DirectionsRenderer(renderOptions);
	
	this.routeOptions = routeOptions;
	
	/*Methods*/	
	this.directionsService.route(routeOptions,function(result,status){
			if (status == google.maps.DirectionsStatus.OK) {
      		objSelf.directionsRenderer.setDirections(result);
    		}else{
				alert("Error Retrieving Directions");
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
	this.byName = function(){
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