// Client ID:
// 8dfe31d8c7a44b1a953ba9e3f9b251fc
// Client Secret
// :
// c04470cf1ab248ff88521866b35d2396

//Main class for all tracks

class Tracks{

	constructor( artist, album, name, albumImage) {
		this. artist =  artist;
		this.album = album;
		this.name = name;
		this.albumImage = albumImage;
		this.votes = 0
	}

	 upvote(){
		this.votes = this.votes +=1
	}
	 downVote(){
		return this.votes = this.votes -=1
	}

};

let tempTrack= new Tracks("Coldplay","Sparks","Foo","Bar");
