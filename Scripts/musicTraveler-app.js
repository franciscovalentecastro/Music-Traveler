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
	
	//Bind FrontEnd With Functions
	document.getElementById("musictraveler-submitsearch").onclick = function() { 
					Search( document.getElementById("musictraveler-inputsearch").value );
		} ;
		
	document.getElementById("musictraveler-newtrip").onclick = function() { 
					NewTrip();
		} ;
		
	document.getElementById("musictraveler-starttrip").onclick = function() { 
					StartTrip();
		} ;
		
	document.getElementById("musictraveler-skip").onclick = function() { 
					Skip();
		} ;
		
	document.getElementsByClassName("sidebar-arrow")[0].onclick = function() { 
					CloseSideBar();
		} ;
	
	document.getElementsByClassName("sidebar-infobar")[0].onclick = function() { 
					OpenSideBar();
		} ;
		
	$(".sidebar-expando-opened .sidebar-expando-header").click(function(){
		ToggleExpando( this.parentNode );
	});
	
	$(".sidebar-expando-closed .sidebar-expando-header").click(function(){
		ToggleExpando( this.parentNode );
	});
		
	tripManager.mapRenderer.onResultClick = ResultClickEvent ;
	
	tripManager.mapRenderer.onTripClick = TripClickEvent ;
	
	musicPlayer.onPlaylistLoad = PlaylistLoad;
	
	musicPlayer.onSongEnd = SongEnd;
	
	$(".musictraveler-playlist label").click( PlaylistSongClick );
	
	// Initialize App
	
	NewTrip();
	ToggleExpando( $(".sidebar-expando-opened") );
}

function Search(query){
	tripManager.searchArtist(query);
}

function NewTrip(){
	navigator.geolocation.getCurrentPosition(function(position) {  
		tripManager.newTrip( new Position("My Position",position.coords.latitude,position.coords.longitude)  );
	} ,function(error){
		tripManager.newTrip( new Position("My Position",21.123619, -101.680496 )  );
	});  
}

function StartTrip(){
	if( tripManager.nodeTripCollection[ tripManager.nodeTripIndex ].name == "My Position" ){
		tripManager.skipForward();
	}

		var positionObj = tripManager.nodeTripCollection[ tripManager.nodeTripIndex ];
	 
	musicPlayer.newPlaylist( positionObj.artist.name  ,"youtube");		

}

function Skip(){
	tripManager.skipForward();
	var positionObj = tripManager.nodeTripCollection[ tripManager.nodeTripIndex ];
	
	musicPlayer.newPlaylist( positionObj.artist.name  ,"youtube");
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

var PlaylistLoad = function(){	
	CreatePlaylist();	
	
	musicPlayer.play(0);
}

var SongEnd = function(){
	var temp= checkNextSong();
	if( temp ==-1 ){
		Skip();	
	}else{
		musicPlayer.play(  temp );
	}
}

function checkNextSong(){
	// Check If Theres SOng In list	
	var playlistNodes =	document.getElementsByClassName("musictraveler-playlist")[0].childNodes;
	var tempNode;	
	var inputNode;
	for(var i=0 ;i<playlistNodes.length ; i++){
			tempNode= playlistNodes[i];
			inputNode =tempNode.getElementsByTagName("input")[0];
			if( inputNode.checked && parseInt(inputNode.value) > musicPlayer.playlistSongIndex ){
				return parseInt(inputNode.value);
			}
	}	
	return -1;
}

var CloseSideBar = function(){
	$(".sidebar-content").animate({width: 'toggle'}); 
	$("#musictraveler-sidebar").animate({ width: '.7%' });
}

var OpenSideBar = function(){
	
	if( $(".sidebar-content").css("display") == "none" ){
		$("#musictraveler-sidebar").animate({ width: '20%' });
		$(".sidebar-content").animate({width: 'toggle'}); 
	}
}

var CreatePlaylist = function(){
	// Create Playlist List
	var olNode = document.getElementsByClassName("musictraveler-playlist")[0];

	while( olNode.hasChildNodes() ){
		olNode.removeChild( olNode.firstChild );	
	}	

	musicPlayer.playlist.forEach(function(element,index,array){
		var listNode = document.createElement("li");
		var labelNode = document.createElement("label");
		var inputNode = document.createElement("input");
		
		//Label Set
		labelNode.textContent = element.title;
		
		//InpuNode set
		inputNode.setAttribute("type","checkbox");
		inputNode.setAttribute("value",index);
		
		listNode.appendChild(labelNode);
		listNode.appendChild(inputNode);		
		
		olNode.appendChild( listNode );		
		
	}.bind(this));	
	
	$(".musictraveler-playlist label").click( PlaylistSongClick );
}

var ToggleExpando = function(element){
	$(element).toggleClass("sidebar-expando-closed");
	$(element).toggleClass("sidebar-expando-opened");
	
	$(element).children("div , ol, label").slideToggle();	
}

var PlaylistSongClick = function(){
		var inputNode =this.parentNode.getElementsByTagName("input")[0];
		musicPlayer.play( parseInt(inputNode.value)  );		
}