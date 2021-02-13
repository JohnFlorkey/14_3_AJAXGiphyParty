const giphyAPISearchURL = 'http://api.giphy.com/v1/gifs/search';
const giphyAPIKey = 'dwyh55BViwxuUaMfMYisdVuknAJiFqe8';

async function orchestrator(searchTerm) {
    // perform the API search
    const responseURL = await searchGiphy(searchTerm);
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
    $('<img>').attr('src', url).appendTo($('#userGifs'));
}

$('#btnSearch').on('click', function(e) {
    e.preventDefault(); 
    orchestrator($('#searchTerm').val());
})
