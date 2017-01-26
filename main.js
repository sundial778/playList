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

    const url = 'https://api.spotify.com/v1/search/?q=[ARG1]&type=[ARG2]&limit=1'
    const path = 'playlist/playlist.csv'
    const Client_ID = '8dfe31d8c7a44b1a953ba9e3f9b251fc'
    const Client_Secret = 'c04470cf1ab248ff88521866b35d2396'
    var sRestrict = "Track"
    var valArray = [];

    //This pulls in the playlist. It will be updated and reloaded evry time the user clicks the button
    $('#load').click(function (e) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", path)

        xhr.send();
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) {

                if (xhr.status === 200) {

                    var csvStr = xhr.responseText

                    makeItUseable(csvStr)
                } else {

                }
            };


        }


    });
    console.log(sRestrict)
    //this converts the csv into a string tht I can eventually use for an API call
    function makeItUseable(text) {
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
            callMeBeepMe(data.searchString)
        });
    }


    //this makes the calls to the API. Either from the user input or the CSV
    function search(que, searchParam) {
        var xhr = new XMLHttpRequest();
        var restPonse = "";
        var newUrl = url.replace('[ARG1]', que)
        trackArray = [];
        newUrl = newUrl.replace('[ARG2]', searchParam)
        xhr.open("GET", newUrl);
        xhr.send();
        xhr.onreadystatechange = function (e) {
            if (this.readyState === 4) {

                if (this.status === 200) {

                    restPonse = this.responseText

                    restPonse = JSON.parse(this.responseText);
                    //make sure that there are results before returning anything
                    //if (restPonse.albums.items.length < 1) {
                    //    console.log(xhr.statusText);
                    //    $('#resp').attr('src', './img/red_x.png');
                    //    return null;

                    // }


                    $('#resp').attr('src', './img/green_check.png');

                    makeObj(restPonse);


                } else {
                    console.log(xhr.statusText);
                    $('#resp').attr('src', './img/red_x.png');

                }

            }

            xhr.onerror = function (e) {
                console.log(xhr.statusText);
            };


            //  if you wanna reach me

          
           
    var searchName;

    function makeObj(param) {
        var tempObj
        valArray = []
        switch (sRestrict) {

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
            case "All":
                tempObj = new Tracks(param);
                break;


        }
        valArray.push(tempObj)
        writeToPage(valArray,"Track")

    }


            //this writes all the data to the page
    function writeToPage(arr,sType) {

        valArray.forEach(function (data) {
            switch (sRestrict) {
                case "Album":
                    $('#values').append('<li>' + "Album Name:" + data.albumName + '<br>' + "Artist Name: " + data.artistName + '<br>' + " Album:" + data.album + '<br>' + '<img src =' + data.albumArt + ' alt =' + data.albumName + 'height="200" width ="200"' + '>' + '<br> <select>' + data.songs.forEach(function (sData) { $('select').append('<option>' + "Song Name: " + sData.name + '</option>') }) + '</select>' + '</li>')
                    break;
                case "Artist":
                    $('#values').append('<li>' + "Artist:" + data.Artist + '<br>' + '<img src =' + data.image + ' alt =' + data.Artist + 'height="200" width ="200"' + '>' + '<br> Albums:<select id=' + data.id + '>' + data.Albums.forEach(function (aData) { $('#' + data.id).append('<option>' + "Album Name: " + aData.name + '</option>') }) + '</select>' + '</li>')

                    break;
                case "Track":
                    $('#values').append('<li>' + "Artist:" + data.artist + '<br>' + "Song Name: " + data.name + '<br>' + " Album:" + data.album + '<br>' + '<img src =' + data.images + ' alt =' + data.name + 'height="200" width ="200"' + '>' + '</li>')

                    break;
                case "All":
                    $('#values').append('<li>' + "Artist:" + data.artist + '<br>' + "Song Name: " + data.name + '<br>' + " Album:" + data.album + '<br>' + '<img src =' + data.images + ' alt =' + data.name + 'height="200" width ="200"' + '>' + '</li>')

                    break;
                case "Load":

                    $('#values').append('<li>' + "Artist:" + data.artist + '<br>' + "Song Name: " + data.name + '<br>' + " Album:" + data.album + '<br>' + '<img src =' + data.images + ' alt =' + data.name + 'height="200" width ="200"' + '>' + '</li>')
            }
        });

    }
        };



}


    $('#submit').click(function (e) {

        searchName = $('#searchBox').val()
        console.log(sRestrict)
        search(searchName, sRestrict);
        e.preventDefault();
    });



});