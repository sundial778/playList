// JavaScript source code
class Tracks {
    constructor(json){
        this.id = json.id
        this.name =  json.name
        this.artist = json.artists[0].name
        this.album = json.album.name
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




$(document).ready(function() {

    const url = 'https://api.spotify.com/v1/search/?q=[ARG1]&type=album,artist,playlist,track'
    const Client_ID = '8dfe31d8c7a44b1a953ba9e3f9b251fc'
    const Client_Secret = 'c04470cf1ab248ff88521866b35d2396'
    var stuff = [];
    const xhr = new XMLHttpRequest();




    function callMeBeepMe(que) {
        var restPonse = "";
        xhr.open("GET", url.replace('[ARG1]', que));
        xhr.onreadystatechange = function(e) {
            if (xhr.readyState === 4) {

                if (xhr.status === 200) {

                    restPonse = xhr.responseText

                    restPonse = JSON.parse(xhr.responseText);

                    console.log(restPonse)

                    $('#resp').attr('src', './img/green_check.png');

                     makeTrack(restPonse);

                    $('#values').append(stuff.join(''));

                    console.log(stuff.length)
                    /* for(i = 1; i < stuff.count;i++){

                     }*/
                } else {
                    console.log(xhr.statusText);
                    $('#resp').attr('src', './img/red_x.png');

                }

            }
        };





        xhr.onerror = function(e) {
            console.log(xhr.statusText);
        };
        xhr.send(null);

        //  if you wanna reach me
        //     $.ajax({
        //         url: url + '/search/',
        //         method: 'GET',
        //         dataType: 'json',
        //         data: {
        //             q: que,
        //             type: 'artist'
        //         },
        //         success: function (json) {
        //             console.log(url)
        //             $('#resp').attr('src', './img/green_check.png');
        //             // do stuff with json 
        //             var stuff = []




        //             stuff.push('<li>' + json.artists.items[0].id + '</li>')
        //             $('#values').append(stuff.join(''))
        //             console.log(json)
        //         },
        //         error:function(){
        //             $('#resp').attr('src','./img/red_x.png');
        //         }      
        //     });

    }
    var searchName;

     function makeTrack(json){
            
            var tempTrack =  new Tracks(json);
            stuff.push(tempTrack)
        }

    $('#submit').click(function(e) {

        searchName = $('#searchBox').val()
        callMeBeepMe(searchName);
        e.preventDefault();
    });



});