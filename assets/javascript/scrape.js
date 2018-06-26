
var topics =['dog','cat','sugar glider', 'giraffe'];

function renderBtns() {
    $('#animalButtons').empty();

    for (var i=0;i<topics.length;i++) {
        var a=$('<button>');
        a.addClass('btn btn-primary');
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

});

$(document).on('click','.btn', function () {
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
            var p = $('<p>');
            
            p.text('Rating: '+results[i].rating);
            var animalImg = $('<img>');
            
            animalImg.attr('data-still',results[i].images.fixed_height_still.url)
            animalImg.attr('src', animalImg.attr('data-still'));
            animalImg.attr('data-animate',results[i].images.fixed_height.url)
            animalImg.attr('data-state','still');
            animalImg.attr('class','gif');
            var dlName = results[i].title.replace(/\s+/g, '');
            var a = $('<a href=\''+animalImg.attr('data-animate')+'\' download=\''+dlName+'\' ><button>Download!</button></a>');
            //animalImg.attr('alt')
            
            animalDiv.append(animalImg);
            animalDiv.append(p);
            animalDiv.append(a);
            $('#animal').prepend(animalDiv);

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