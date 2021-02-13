const giphyAPISearchURL = 'http://api.giphy.com/v1/gifs/search';
const giphyAPIKey = 'dwyh55BViwxuUaMfMYisdVuknAJiFqe8';

async function orchestrator(searchTerm) {
    // perform the API search
    const arrURL = await searchGiphy(searchTerm);
    // select a random GIF from the results
    const responseURL = randomizeURL(arrURL);
    // add the GIF to the dom
    addGifToDOM(responseURL);
}

function randomizeURL(arrURL) {
    const randomIndex = Math.floor(arrURL.length * Math.random())
    return arrURL[randomIndex];
}

async function searchGiphy(searchTerm) {
    // construct params object for the get request
    const params = {'params': {
        'api_key': giphyAPIKey,
        'q': searchTerm
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
    // check that response contains at least one URL
    if(searchResult.data.data.length > 0) {
        // return an array of URL's for the original size and quality GIF's
        return searchResult.data.data.map((result) => result.images.original.url);
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