// JavaScript source code
$(document).ready(function () {
    const url = 'https://api.spotify.com/v1';

    const Client_ID = '8dfe31d8c7a44b1a953ba9e3f9b251fc'
   const Client_Secret=  'c04470cf1ab248ff88521866b35d2396'

    function callMeBeepMe(que) {
        //if you wanna reach me
        $.ajax({
            url: url + '/search/',
            method: 'GET',
            dataType: 'json',
            data: {
                q: que,
                type: 'artist'
            },
            success: function (json) {
                $('#resp').attr('src', './img/green_check.png');
                // do stuff with json 
                var stuff = []
                
                    
                
                
                stuff.push('<li>' + json.artists.items[0].id + '</li>')
                $('#values').append(stuff.join(''))
                console.log(json)
            },
            error:function(){
                $('#resp').attr('src','./img/red_x.png');
            }      
        });
    }
    var searchName;
    
    $('#submit').click(function (e) {
        
         searchName = $('#searchBox').val()
         callMeBeepMe(searchName);
            e.preventDefault();
        });
   
    

});