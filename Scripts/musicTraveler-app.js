$(document).ready( function(){ initialize(); });
var musicPlayer;
var tripManager;

var initialize = function(){	
	//Initialize Trip Manager
	tripManager  = new TripManager();
	tripManager.initRender(document.getElementById("musictraveler-mapcanvas") ,{
				zoom: 0,
				center:  new google.maps.LatLng(17.875178016106634, 20.21431250000001),
				mapTypeId:  google.maps.MapTypeId.ROADMAP,
				minZoom : 2
	});
	
	//Initialize Music Player
	musicPlayer = new MusicPlayer( document.getElementById("youtube-player-container") );
	musicPlayer.hideVideo();
	
	//Bind FrontEnd With Functions
	document.getElementById("musictraveler-submitsearch").onclick = function() { 
					Search( document.getElementById("musictraveler-inputsearch").value );
		} ;
		
	document.getElementById("musictraveler-newtrip").onclick = function() { 
					NewTrip();
		} ;
		
	tripManager.mapRenderer.onResultClick = ResultClickEvent ;
	
	tripManager.mapRenderer.onTripClick = TripClickEvent ;
}

function Search(query){
	tripManager.searchArtist(query);
}

function NewTrip(){
	navigator.geolocation.getCurrentPosition(function(position) {  
		tripManager.newTrip( new Position("My Position",position.coords.latitude,position.coords.longitude)  );
	} ,function(error){
		tripManager.newTrip( new Position("My Position",26.6483739373832, -20.56693749999999 )  );
	});  
}

var ResultClickEvent =function (event){
	var index = tripManager.mapRenderer.resultMarkerCollection.indexOf(this);
	var posObj = tripManager.nodeResultCollection[index];
	
	tripManager.addNextNode(posObj);
}

var TripClickEvent = function (event){
	var index = tripManager.mapRenderer.resultMarkerCollection.indexOf(this);
	var posObj = tripManager.nodeResultCollection[index];
	
	
}
