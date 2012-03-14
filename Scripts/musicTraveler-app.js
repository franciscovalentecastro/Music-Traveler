$(document).ready( function(){ initialize(); });

var initialize = function(){
	var searchBox= new Search();
	searchBox.searchSong("Mania Cardiaca","Enjambre");
	
	multimediaPlayer = new MultimediaPlayer( $("#musictraveler-multimedia") );
	//multimediaPlayer.hideMe();
}

var ManageArtist=function(ArtistArray){
	alert(ArtistArray);	
}	

var ManageSong = function(title,link,type){
	switch(type){
		case "video":
			alert(link);
			multimediaPlayer.setSource(title,link);
			break;
		default:
			
			break;	
	}	
}