const giphyAPISearchURL = 'http://api.giphy.com/v1/gifs/search';
const giphyAPIKey = 'dwyh55BViwxuUaMfMYisdVuknAJiFqe8';

async function orchestrator(searchTerm) {
    // perform the API search
    const responseURL = await searchGiphy(searchTerm);

    // add the GIF to the dom
    addGifToDOM(responseURL);
}

async function searchGiphy(searchTerm) {
    // construct params object for the get request
    const params = {'params': {
        'api_key': giphyAPIKey,
        'q': searchTerm,
        'limit': 1                  // returns only one search result
        }
    };

    // make the API call
    searchResult = await axios.get(giphyAPISearchURL, params);

    // return the url from the single search result
    return searchResult.data.data[0].images.downsized.url;
}

function addGifToDOM (url) {
    $('<img>')                          // create new img element
        .attr('src', url)               // add the src attribute with the URL returned from the Giphy search
        .addClass('userGif')            // add class to make the removal of all the gifs easier
        .appendTo($('#userGifs'));      // append the img element to the userGifs div
}

function removeGifs() {
    $('.userGif').remove();
}

$('#btnSearch').on('click', function(e) {
    // prevent submit action
    e.preventDefault();

    // collect the user input and kick off the rest of the rest of the process
    orchestrator($('#searchTerm').val());

    // clear the text input
    $('#searchTerm').val('');
})

$('#btnRemoveGifs').on('click', function(e) {
    e.preventDefault();
    removeGifs();
})