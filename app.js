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

    try {
        // make the API call
        searchResult = await axios.get(giphyAPISearchURL, params);
    }
    catch (err) {
        alert('Something went wrong')
        return
    }
    // return the url from the single search result
    if(searchResult.data.data.length > 0) {
        return searchResult.data.data[0].images.original.url;
    } else {
        alert('Search returned no results');
    }
}

function addGifToDOM (url) {
    $('<img>')                          // create new img element
        .attr('src', url)               // add the src attribute with the URL returned from the Giphy search
        .addClass('userGif')            // add class to make the removal of all the gifs easier
        .addClass('m-2')                // add some margin
        .addClass('rounded')            // round the corners
        .appendTo($('#userGifs'));      // append the img element to the userGifs div
}

function removeGifs() {
    $('.userGif').remove();
}

function submitForm(e) {
    // validate there is some input
    if($('#searchTerm').val()){
        // collect the user input and kick off the rest of the rest of the process
        orchestrator($('#searchTerm').val());
        // clear the text input
        $('#searchTerm').val('');
    } else {
        alert('A search term is required.')     // let the user know they need to add a search term
    }
}

$('#btnSearch').on('click', (e) => {
    // prevent submit action
    e.preventDefault();
    submitForm(e);
})

$('#searchTerm').on('keydown', (e) => {
    if(e.keyCode === 13){
        submitForm(e)
    }
})

$('#btnRemoveGifs').on('click', (e) => {
    e.preventDefault();
    removeGifs();
})