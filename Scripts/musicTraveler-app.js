window.onload= function(){
	
	var mapa= new Map(document.getElementById("musictraveler-mapcanvas") ,{ 
																	center: new google.maps.LatLng( 48.858 ,  2.29478) , 
																	mapTypeId: google.maps.MapTypeId.ROADMAP ,
																	zoom: 5} );	
	
	
	document.getElementById("submit").onclick=function(){
		
		mapa.newMarker( new google.maps.LatLng( document.getElementById("lat").value ,document.getElementById("lng").value )  );
		
		var rsize	=mapa.markerCollection.length;
		if(rsize >1){
			
			mapa.newRoute( mapa.markerCollection[ rsize -1 ].googleMarker.getPosition(), 			
			mapa.markerCollection[ rsize -2 ].googleMarker.getPosition(),
			google.maps.TravelMode.WALKING  );		
		}
	}	
	document.getElementById("submit-query").onclick=function(){
		var srch = new Search();
		srch.searchArtist(document.getElementById("search").value);		
	}	
	
	var media = new MultimediaPlayer(document.getElementById("musictraveler-multimedia") ); 
	media.setSource("http://www.youtube.com/embed/adV8-_hgL4g");
}

var ManageArtist=function(ArtistArray){
		//alert(ArtistArray);	
}	