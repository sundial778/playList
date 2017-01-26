// JavaScript source code
class Tracks {
    constructor(json) {
        this.id = json.tracks.id
        this.name = json.tracks.items[0].name
        this.artist = json.tracks.items[0].artists[0].name
        this.album = json.tracks.items[0].album.name
        this.votes = 0

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




$(document).ready(function () {

    const url = 'https://api.spotify.com/v1/search/?q=[ARG1]&type=album,artist,playlist,track'
    const path = 'playlist/playlist.csv'
    const Client_ID = '8dfe31d8c7a44b1a953ba9e3f9b251fc'
    const Client_Secret = 'c04470cf1ab248ff88521866b35d2396'
    var stuff = [];
    

    $('#load').click(function (e) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", path)
        console.log(xhr.status)
        xhr.send();
        xhr.onreadystatechange = function (e) {
            if (xhr.readyState === 4) {

                if (xhr.status === 200) {
                    console.log("Saved PlayList");
                    var csvStr = xhr.responseText
                    console.log((csvStr))
                    makeItUseable(csvStr)
                } else {
                    console.log(xhr.statusText);
                }
            };


        }


    });

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
            var searchStuff = {}
            var tempArr = textArr[i].split(',')
            searchStuff[headers[0]] = tempArr[0]
            searchStuff[headers[1]] = tempArr[1]
            searchStuff.searchString = "track:" + tempArr[0] + "+artist:" + tempArr[1] + "&type=track&limit=1"
            objArr.push(searchStuff)
        }
        objArr.forEach(function (data) {
            callMeBeepMe(data.searchString)
        });
    }



    function callMeBeepMe(que) {
        var xhr = new XMLHttpRequest();
        var restPonse = "";
        xhr.open("GET", url.replace('[ARG1]', que));
        xhr.send();
        xhr.onreadystatechange = function (e) {
            if (this.readyState === 4) {

                if (this.status === 200) {

                    restPonse = this.responseText

                    restPonse = JSON.parse(this.responseText);

                    console.log(restPonse)

                    $('#resp').attr('src', './img/green_check.png');

                    makeTrack(restPonse);
                    stuff.forEach(function(data){
                        $('#values').append(data.name);
                    })
                    

                    console.log(stuff.length)
                    /* for(i = 1; i < stuff.count;i++){

                     }*/
                } else {
                    console.log(xhr.statusText);
                    $('#resp').attr('src', './img/red_x.png');

                }

            }
        };


        xhr.onerror = function (e) {
            console.log(xhr.statusText);
        };


        //  if you wanna reach me

    }
    var searchName;

    function makeTrack(json) {

        var tempTrack = new Tracks(json);
        stuff.push(tempTrack)
    }

    $('#submit').click(function (e) {

        searchName = $('#searchBox').val()
        callMeBeepMe(searchName);
        e.preventDefault();
    });



});