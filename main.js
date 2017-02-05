// JavaScript source code
class Tracks {
    constructor(json) {
        this.id = json.tracks.id;
        this.name = json.tracks.items[0].name;
        this.artist = json.tracks.items[0].artists[0].name;
        this.album = json.tracks.items[0].album.name;
        this.votes = 0;
        this.images = json.tracks.items[0].album.images[0].url;

    }

    upVote() {
        this.rating = this.rating + 1
    };

    downVote() {
        this.rating = this.rating - 1
    };
    playPreview() {
        //playback
    };
};



class Album {
    constructor(json) {
        this.id = ""
        this.albumName = ""
        this.artistName = ""
        this.albumArt = ""
        this.songs = [];
    }


}



class Artist {
    constructor(json) {
        this.id = json.artists.items[0].id;
        this.Artist = json.artists.items[0].name;
        this.Albums = [];
        this.image = json.artists.items[0].images[0].url;
    }
}

$(document).ready(function () {

    const url = 'https://api.spotify.com/v1/search/?q=[ARG1]&type=[ARG2]&limit=1';
    const path = 'playlist/playlist.csv';
    const Client_ID = '8dfe31d8c7a44b1a953ba9e3f9b251fc';
    const Client_Secret = 'c04470cf1ab248ff88521866b35d2396';
    var sRestrict = $('#sBox').val()
    var valArray = [];

   //[ This pulls in the playlist. It will be updated and reloaded evry time the user clicks the button
    $('#load').click(function (e) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", path)

        xhr.send();
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) {

                if (xhr.status === 200) {

                    var csvStr = xhr.responseText

                    makeItUseable(csvStr,"Load")
                } else {

                }
            };


        }


    });

    //this converts the csv into a string tht I can eventually use for an API call
    function makeItUseable(text, param) {
        var textArr = text.split("\n")
        for (i = 0, len = textArr.length; i < len; i++) {
            while (textArr[i] == "") {
                textArr.splice(i, 1)
            }

        }
        var objArr = []
        var headers = textArr[0].split(",")
        for (i = 1; i < textArr.length; i++) {
            var searchObj = {}
            var tempArr = textArr[i].split(',')
            searchObj[headers[0]] = tempArr[0]
            searchObj[headers[1]] = tempArr[1]
            searchObj.searchString = "track:" + tempArr[0] + "+artist:" + tempArr[1] + "&type=track&limit=1"
            objArr.push(searchObj)
        }
        objArr.forEach(function (data) {
            search(data.searchString, param)
        });
    }

    //Search for artist, track album etcetera
    $('#submit').click(function (e) {
        //user input into search box
        searchName = $('#searchBox').val()
        console.log(sRestrict)
        //xhr
        search(searchName, sRestrict);
        //clear the list before appending results
        $('#values').html('')
        e.preventDefault();
    });//]  the first step. 



    //monitoring what is being searched for
    console.log(sRestrict)
//[SECOND STEP
    function search(que, searchParam) {
        //A small workaround until I get the search type working
        let searchModifier = false
        if (searchParam == "Load") {
            searchParam = "Track"
             searchModifier = true
        }

        //package my data into a 'link'
        var xhr = new XMLHttpRequest();
        var restPonse = "";
        //^^^^ the eventual rest(see what i did there)ing place for the JSON string
        var newUrl = url.replace('[ARG1]', que)
        //every time a call is made, the URL has to be updated witht he search parameter and the search type
        valArray = [];
        newUrl = newUrl.replace('[ARG2]', searchParam)

        //aforementioned search type ^^^
        xhr.open("GET", newUrl);
        //Spotify, Please tell me what you have that is relevant to the query I have sent you?
        xhr.send();
        xhr.onreadystatechange = function (e) {
            if (this.readyState === 4) {
                //The call went through
                if (this.status === 200) {
                    //there is someone at the other end!
                    restPonse = this.responseText
                    //this is what they said
                    if (restPonse !== "") {
                        restPonse = JSON.parse(this.responseText);
                        //make sure that there are results before returning anything
                    }
                    else {
                        console.log(xhr.statusText);
                        $('#resp').attr('src', './img/red_x.png');
                        //No response!
                    };
                    //a visual aid to know that your call and response was good!
                    $('#resp').attr('src', './img/green_check.png');
                    //searchmodifier is part of the workaround
                    if (searchModifier === true) {
                        searchParam = "Load"
                    }
                    makeObj(restPonse, searchParam);

                    //Well if no one picked up thereis no need to leave a voicemail. Also if you had a bad number, no need to hang on to the phone.
                } else {
                    console.log(xhr.statusText);
                    $('#resp').attr('src', './img/red_x.png');

                }

            }
            //anything else that goes wrong, handle it and move on
            xhr.onerror = function (e) {
                console.log(xhr.statusText);
            }; //]


            //This is specific for the searches that the user does. 
            function makeObj(param, load) {
                var tempObj
                valArray = []
                switch (load) {
                    //what type of search is it? Because of the workaround it limits the search to be either a track or a 'load'
                    case "Album":
                        tempObj = new Album(param);
                        tempObj.songs.push()
                        break;
                    case "Artist":
                        tempObj = new Artist(param);
                        break;
                    case "Track":
                        tempObj = new Tracks(param);
                        break;
                    case "Load":
                        tempObj = new Tracks(param);
                        break;


                }
                //made the object type and put it in an array to store it
                valArray.push(tempObj)
                if (load !== "Load") {
                    writeToPage(valArray, "Track")
                }
                else {
                    writeToPage(valArray, load)
                }

            }






   


    //this makes the calls to the API. Either from the user input or the CSV
    


            //  if you wanna reach me

          
           
    var searchName;



            //this writes all the data to the page
    function writeToPage(arr,sType) {
        if (sType == "Load") {
            sRestrict = sType
        }
        valArray.forEach(function (data) {
            switch (sRestrict) {
                case "Album":
                    $('#values').append('<li>' + "Album Name:" + data.albumName + '<br>' + "Artist Name: " + data.artistName + '<br>' + " Album:" + data.album + '<br>' + '<img src =' + data.albumArt + ' alt =' + data.albumName + 'height="200" width ="200"' + '>' + '<br> <select>' + data.songs.forEach(function (sData) { $('select').append('<option>' + "Song Name: " + sData.name + '</option>') }) + '</select>' + '</li>')
                    break;
                case "Artist":
                    $('#values').append('<li>' + "Artist:" + data.Artist + '<br>' + '<img src =' + data.image + ' alt =' + data.Artist + 'height="200" width ="200"' + '>' + '<br> Albums:<select id=' + data.id + '>' + data.Albums.forEach(function (aData) { $('#' + data.id).append('<option>' + "Album Name: " + aData.name + '</option>') }) + '</select>' + '</li>')

                    break;
                case "Track":
                    $('#values').append('<li id ="2">' + "Artist:" + data.artist +'</li> <li id="1">'+ "Song Name: " + data.name +'</li><li id ="3">' + " Album:" + data.album +'</li><li id ="4">' +'<img src =' + data.images + ' alt =' + data.name + 'height="200" width ="200"><input type="button" id ="addToPlist" value ="Add to Playlist"> </li>')

                    break;
    
                 case "Load":

                    $('#values').append('<li>' + "Artist:" + data.artist + '<br>' + "Song Name: " + data.name + '<br>' + " Album:" + data.album + '<br> <img src =' + data.images + ' alt =' + data.name + 'height="200" width ="200"> <img src = "./img/up.png" id ="upVote" alt="upVote" height="20" width ="20"><img src = "./img/dwn.png" id ="dwnVote" alt="downVote" height="20" width ="20"> </li>')
            }
        });
        sRestrict = "Track"

    }
        };



}
    $('#addToPlist').click(function (e) {
        alert("ADDED")
        e.preventDefault();
    });

   


});