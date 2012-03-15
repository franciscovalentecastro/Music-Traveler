/* Object Collection*/


/* Artist Object*/

var Artist = function( name, origin,latlng,genre ){
	this.name = name; 												// String
	this.origin = origin; 											// String
	this.latlng = latlng ; 											// LatLng
	this.genre = genre;												// String
}

/*Song Object*/

var Song = function(title,artist,description,multimediaLink,sourceType){
	this.title = title; 												// String
	this.artist = artist; 											// String or Artist Obj
	this.description = description; 								// String
	this.multimediaLink = multimediaLink; 						// URL or Video Id
	this.sourceType = sourceType; 								// type "youtube" etc.
}

/*DataManager Object*/

var DataManager = function(){
	/* Change of context help */
	var objSelf = this;
	
	/*getArtist : Retrieve Artists that get out from a query*/  	
	
	this.getArtist = function(artist,callbackFunction){ 									   // From Freebase
		try{
			var jsonObj =	[{																				//MQL Query Object 
					"name":null, 																			// Get Name
					"type":"/music/artist", 															// Set Type
					"origin":{"name":null, "optional":true, "limit":1 },          		   // Get Origin
					"genre": {"name":null, "optional":true, "limit":1 },  					// Get Genre
					"/common/topic/image" : [{ "id":null, "optional":true, "limit":1 }] 	//Get Image
			}];		
			
		
			$.ajax({			// Ajax Object
        			url: "http://api.freebase.com/api/service/search",   //Url for POSTING		
        			data: {query:artist , type:"/music/artist", mql_output:JSON.stringify(jsonObj)} ,      // Data for query
        			context: this, 																						      //Context of Callback
        			dataType: "jsonp", 																							//Data Typer for CroossDomain
        			success: function(data, textStatus, jqXHR){															//Callback Function
						this.artistResult( data, textStatus, jqXHR ,callbackFunction );        
        			}																						
    		});
    	}catch(exception){
			// Handle Exceptions
			alert(exception);
			console.debug(exception);	
		}    		
	}		
	
	/*getArtist : Manage Results form getArtist*/ 	
	
	this.artistResult = function(data, textStatus, jqXHR , callbackFunction){
		try{ 																												   // Error Handling					
			if(data.code=="/api/status/ok"){  																		// Validation of Query
				
				var ArtistResultArray = [];
				var jsonRes = data.result;
			
				for(ind in jsonRes){																						// Create Results Array
					tmpArtist = new Artist( 
						jsonRes[ind].name, 																				//Name	
						jsonRes[ind].origin === null ? "undefined" : jsonRes[ind].origin.name , 		//Origin Place Name
						"None",																								//Latitude Longitude
						jsonRes[ind].genre === null ? "undefined" : jsonRes[ind].genre.name           //Genre Name
			      );																				
							
					ArtistResultArray.push(tmpArtist);
				}					
			
				callbackFunction(ArtistResultArray); 																	// Callback Function									
			}else{
				alert("Query Error "+ data.code );		
			}	
			
		}catch(exception){																								// Handle Exceptions
			alert(exception);
			console.debug(exception);		
			callbackFunction([]);
		}		
	}	
	
	
	/*getSong : Get Songs Results from query*/
	
	this.getSong= function(title,artist,callbackFunction){																//Retrieve Songs Youtube
			try{		
																																	//Handle Exceptions
				$.ajax({
        			url: "http://gdata.youtube.com/feeds/api/videos?callback=?&alt=json&q="+title+" "+artist+
        				"&max-results=10&fields=entry(title,content,media:group(media:content))",
        			data: {  } ,
        			context: this,																							         //Context Of Callback
        			dataType: "jsonp",
        			success: function(data, textStatus, jqXHR){																//Callback Function					
						this.songResult(data, textStatus, jqXHR , callbackFunction);
		  			}        
    			});
    		}catch(exception){
				alert(exception);				
				console.debug(exception);
			}    		
	}		
	
	/* songResult: Manage Results of getSong */
	
	this.songResult = function(data, textStatus, jqXHR ,callbackFunction){					
		try{
			var jsonRes= data.feed.entry;
			var tmpSong;
			var SongResultArray = new Array(0);
			for(ind in jsonRes){																	//Loop Create Song Objects From Results
			
				var result = jsonRes[ind];
				
				var link =   result.media$group.media$content[0].url;
				link = youtubeVideoId(link);
				
				var songContent = result["content"]["$t"];
				var songTitle = result["title"]["$t"];
				
				tmpSong = new Song(																//New Song Object
					 songTitle,
					 songTitle ,
					 songContent ,
					 link,
					 "youtube"
				);				
				
				SongResultArray.push( tmpSong );
			}
			
			callbackFunction(SongResultArray);												//CallBack

		}catch(exception){
			alert(exception);				
			console.debug(exception);
			callbackFunction([]);
		}
	}	
	
	/*Utilities*/
		
	var youtubeVideoId = function(youtubeLink){ // Get Youtube Video Id
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    	var match = youtubeLink.match(regExp);
    	if (match && match[7].length==11){
        return match[7];
    	}else{
			return youtubeLink;
		}	    	
	}	
		
}

/* Music Player Object */

var MusicPlayer = function(objHTML){
	/* Change of context help */
	var objSelf = this;
	this.objHTML = objHTML;    											//HTML tag were it will be rendered
	this.playlist = new Array();											//Array of Song Objects
	this.playlistSongIndex =0 ;    											// PlayList Index
	this.status = "unloaded";													// Status of Music Player
	
	this.youtubePlayer = $(objHTML).tubeplayer({																//Youtube Player
									width: 250, // the width of the player
									height: 250, // the height of the player
									allowFullScreen: "true", // true by default, allow user to go full screen
									preferredQuality: "default",// preferred quality: default, small, medium, large, hd720
									onPlay: function(id){ 
										this.status ="playing" 
									}.bind(this), // after the play method is called
									
									onPause: function(){  
										this.status ="paused"  
									}.bind(this) , // after the pause method is called
									onStop: function(){   
										this.status ="stoped"  
									}.bind(this) , // after the player is stopped
									onSeek: function(time){}, // after the video has been seeked to a defined point
									onMute: function(){}, // after the player is muted
									onUnMute: function(){} // after the player is unmuted
								});	
	
	this.newPlaylist = function(artist,source){						
		
		this.status="loading";												//Set Status		
		
		dataManager = new DataManager();		
		switch(source){														//Source of the playlist & player that will be used
			case "youtube":
				dataManager.getSong("",artist, this.playlistResult.bind(this) );
				break;				
			default:
				break;		
		}
								
	}	
	
	this.playlistResult = function(songResultArray){		
		this.playlist = this.playlist.concat(songResultArray);					
		this.status="ready";										    		//Set Status	
	}	
	
	
	
	this.play = function( playlistSongIndex ){
		
		if(playlistSongIndex == null){                    // Check if parameter was passed
			playlistSongIndex = this.playlistSongIndex;
		}			
				
		if(this.status  == "ready" || this.status  == "paused" || this.status  == "playing" || this.status  == "stoped"){ //Check Player Status
		
			if( this.playlist[  playlistSongIndex ] !== null ){	 //Check if song number exists
				
				
				this.playlistSongIndex = playlistSongIndex;
				var songObj = this.playlist[ this.playlistSongIndex ];
		
				switch( songObj.sourceType ){
					case "youtube" :
						
						switch(this.status){
							case "ready":							
								$(objHTML).tubeplayer("play", songObj.multimediaLink );		
								break;							
								
							case "paused":
								$(objHTML).tubeplayer("play");
								break;
								
							case "playing":
								$(objHTML).tubeplayer("play", songObj.multimediaLink );	
								break;
								
							default:
								break;						
						}						
												
						break;
					default:
						break;
				}
				
			}	
		}			
	}	
	
	this.pause = function(){
		var songObj = this.playlist[ this.playlistSongIndex ];
		
		switch( songObj.sourceType ){
			case "youtube" :
				switch(this.status){						
							case "playing":
								$(objHTML).tubeplayer("pause");
								break;
							default:
								break;						
				}				
				break;
			default:
				break;
		}		
	}	
	
	this.hideVideo= function(){
		$(objHTML).hide();	
	}
	
	this.getStatus = function(){
		return this.status;
	}				
}



