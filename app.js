const giphyAPISearchURL = 'http://api.giphy.com/v1/gifs/search';
const giphyAPIKey = 'dwyh55BViwxuUaMfMYisdVuknAJiFqe8';

async function orchestrator(searchTerm) {
    // perform the API search
    const responseURL = await searchGiphy(searchTerm);

    // add the GIF to the dom
    addGifToDOM(responseURL);
}

async function searchGiphy(searchTerm) {
    const params = {'params': {
        'api_key': giphyAPIKey,
        'q': searchTerm,
        'limit': 1
        }
    };
    searchResult = await axios.get(giphyAPISearchURL, params);
    return searchResult.data.data[0].images.downsized.url;
}

function addGifToDOM (url) {
    $('<img>')
        .attr('src', url)
        .addClass('userGif')
        .appendTo($('#userGifs'));
}

function removeGifs() {
    $('.userGif').remove();
}

$('#btnSearch').on('click', function(e) {
    e.preventDefault(); 
    orchestrator($('#searchTerm').val());
})

$('#btnRemoveGifs').on('click', function(e) {
    e.preventDefault();
    removeGifs();
})