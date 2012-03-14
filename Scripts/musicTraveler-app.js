$(document).ready( function(){ initialize(); });

var initialize = function(){
	
	multimediaPlayer = new MultimediaPlayer( $("#musictraveler-multimedia") );
	//multimediaPlayer.hideMe();
	
	//$("#youtube-player-container").tubeplayer("play");
	var searchBox= new Search();
	searchBox.searchSong("Mania Cardiaca","Enjambre");
}

var ManageArtist=function(ArtistArray){
	alert(ArtistArray);	
}	
