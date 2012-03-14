/* Object Collection*/

var Artist = function( name, origin,genre,songs ){
	this.name = name;
	this.origin = origin;
	this.genre = genre;
	this.songs = songs;
}

var Map = function (objHTML,mapOptions){
	this.objHTML=objHTML;
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

var Search = function(){
	/* Binding */
	var objSelf = this;
	
	this.searchArtist = function( srchString , genre , place, resultLimit){
		var jsonObj =	[{
				"name":null,
				"type":"/music/artist",
				"origin":null,
				"genre": {"name":null, "optional":true, "limit":1 },
				"/common/topic/image" : [{ "id":null, "optional":true, "limit":1 }]
			}];		
			
		
		$.ajax({
        url: "http://api.freebase.com/api/service/search",
        data: {query:srchString , type:"/music/artist", mql_output:JSON.stringify(jsonObj)} ,
        dataType: "jsonp",
        success: this.artistManager
    	});	
	}
	
	this.artistManager = function(response){ // Retrives result from Query add formats them for the app
		
		if(response.code=="/api/status/ok"){
			
			var ArtistResults = [];
			var jsonRes = response.result;
			
			for(ind in jsonRes){
				tmpArtist = new Artist( 
					jsonRes[ind].name, 
					jsonRes[ind].origin , 
					jsonRes[ind].genre === null ? "undefined" : jsonRes[ind].genre.name ,
					"No Songs Listed" );				
							
				ArtistResults.push(tmpArtist);
			}					
			
			//ManageArtist(ArtistResults);			
		}				
		
	}		
	
	
	
	/*Youtube Song PLayer*/
	
	this.searchSong = function(title,artist){ // Search Song 
		$.ajax({
        url: "http://gdata.youtube.com/feeds/api/videos?callback=?&alt=json&q="+title+" "+artist+
        "&max-results=1&fields=entry(title,media:group(media:thumbnail,media:content))",
        data: {  } ,
        dataType: "jsonp",
        success: this.songManager
    	});
	}	
	
	this.songManager = function(response){ 
		var result=response.feed.entry[0];
		var link=result.media$group.media$content[0].url;
		link = youtubeVideoId(link);		
		//ManageSong(result.title["$t"],link,"video");
	}	
	
	var youtubeVideoId = function(youtubeLink){ // Get Youtube Video Id
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    	var match = youtubeLink.match(regExp);
    	if (match&&match[7].length==11){
        return match[7];
    	}else{
			return youtubeLink;
		}	    	
	}	
		
}

var MultimediaPlayer = function(objHTML){
	
	this.size;
	this.type;
	this.title;
	this.source;
	this.objHTML;
	
	this.initPlayer = function(){
		$("#youtube-player-container").tubeplayer({
				width: 250, // the width of the player
				height: 250, // the height of the player
				allowFullScreen: "true", // true by default, allow user to go full screen
				initialVideo: "DkoeNLuMbcI", // the video that is loaded into the player
				preferredQuality: "default",// preferred quality: default, small, medium, large, hd720
				onPlay: function(id){}, // after the play method is called
				onPause: function(){}, // after the pause method is called
				onStop: function(){}, // after the player is stopped
				onSeek: function(time){}, // after the video has been seeked to a defined point
				onMute: function(){}, // after the player is muted
				onUnMute: function(){} // after the player is unmuted
			});	
	}	
	
	this.setVideo = function(title,artist){
			
	}
	
	this.hideMe= function(){
		$($(objHTML).find('#youtube-player-container')).hide();	
	}	
	
	
	/*Initialize Object*/
	this.initPlayer();
}