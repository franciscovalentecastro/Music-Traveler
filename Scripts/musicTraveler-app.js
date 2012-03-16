$(document).ready( function(){ initialize(); });
var player;
var initialize = function(){	

	player = new MusicPlayer( $("#youtube-player-container") );
	//player.newPlaylist("Daft Punk","youtube");
	
		
	player.play(0);
}
