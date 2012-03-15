$(document).ready( function(){ initialize(); });
var player;
var initialize = function(){	

	player = new MusicPlayer( $("#youtube-player-container") );
	player.newPlaylist("Justice","youtube");
	
		
	player.play(0);
}
