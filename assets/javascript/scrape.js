
var topics =['dog','cat','bunny', 'giraffe'];
var favArray=[];
//=localStorage.getItem("favs");

function renderBtns() {
    $('#animalButtons').empty();

    for (var i=0;i<topics.length;i++) {
        var a=$('<button>');
        a.addClass('btn btn-primary animalBtn');
        a.attr('data-name', topics[i]);
        a.text(topics[i]);
        $('#animalButtons').append(a);
    }
}
renderBtns();
$('#addAnimal').on('click', function() {
    event.preventDefault();
    var topic = $('#animal-input').val().trim();
    topics.push(topic);

    renderBtns();
    $("#animal-input").val("");
});

$(document).on('click','.animalBtn', function () {
    $('#animal').empty();
    console.log('yo');
    var animal = $(this).attr('data-name')
    console.log(animal);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=2K1IZi44N9sbGPOJpa8mpTahfey08JlA&limit=10";

    $.ajax({
        url:queryURL,
        method: 'GET'

    }).then(function(response) {
        console.log(response);
        var results = response.data;
        
        for (var i=0; i<results.length;i++) {
            var animalDiv = $('<div>');
            animalDiv.attr('class','gifDivs');
            var p = $('<p>');
            p.append( "Title: " + results[i].title.toUpperCase() + "<br>" + "Rating: " + results[i].rating.toUpperCase());
            //p.text('Rating: '+results[i].rating);
            var animalImg = $('<img>');
            var attrObj = {'data-still':results[i].images.fixed_height_still.url,
            'src': results[i].images.fixed_height_still.url,
            'data-animate':results[i].images.fixed_height.url,
            'data-state':'still',
            'class': 'gif'}
            animalImg.attr(attrObj);
            
            //was working on favorite button
            // var favBtn = $('<button>');
            // favBtn.attr('class','btn favBtn');
            // favBtn.attr('data-local', attrObj);
            // favBtn.attr('descriptors', "Title: " + results[i].title.toUpperCase() + "<br>" + "Rating: " + results[i].rating.toUpperCase());
            // favBtn.text('Fav');
            // favBtn.attr('nextSrc', )
            // console.log(animalImg)
            //code below was intended to download gifs but seems to just break things a nd link to the gif
            
            //var dlName = results[i].title.replace(/\s+/g, '');
            //var a = $('<a href=\''+results[i].images.original.url+'\' download=\''+dlName+'\' ><button>Download!</button></a>');
            //animalImg.attr('alt')
            
            animalDiv.append(animalImg);
            animalDiv.append(p);
            //animalDiv.append(favBtn);
            //animalDiv.append(a);
            $('#animal').append(animalDiv);

        }

    });
    
});

$(document).on('click', '.gif', function () {
    
    var state = $(this).attr('data-state');

    if (state==='still') {
        $(this).attr('src', $(this).attr('data-animate'));
        $(this).attr('data-state','animate');

    }
    else {
        $(this).attr('src', $(this).attr('data-still'));
        $(this).attr('data-state','still');
    }


});
// $(document).on('click', '#favorites', function () {
//     favArray=localStorage.getItem("favs");
//     console.log(favArray, 'y');
//     for (var i=0; i<favArray;i++) {
//         var animalDiv = $('<div>');
//         //var p = $('<p>');
        
//         //p.text(favArray[i]);
//         var animalImg = $('<img>');
        
//         animalImg.attr(favArray[i])
//         //code below was intended to download gifs but seems to just break things a nd link to the gif
        
//         //var dlName = results[i].title.replace(/\s+/g, '');
//         //var a = $('<a href=\''+results[i].images.original.url+'\' download=\''+dlName+'\' ><button>Download!</button></a>');
//         //animalImg.attr('alt')
        
//         animalDiv.append(animalImg);
//         //animalDiv.append(p);
//         //animalDiv.append(a);
//         $('#animal').append(animalDiv);

//     }

// });

// $(document).on('click', '.favBtn', function () {
//     console.log($(this).attr('data-local'));
//     favArray.push($(this).attr('descriptors'));
//     //localStorage.setItem("favs", favArray);


// });

