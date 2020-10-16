let apiKey = 'QdMYuIQXh3l1akko9fMsuLogISflEQ3PeeNRBByB';

let searchURL = 'https://developer.nps.gov/api/v1/parks';

function displayResults(responseJson){ 
    $('#results-list').empty();  
    for (let i=0; i < responseJson.data.length; i++){
        $('#results-list').append(
            `<li>
            <h3><a href='${responseJson.data[i].url}'>${responseJson.data[i].fullName}</a></h3>
            <p>${responseJson.data[i].description}</p>
            </li>`
        );
    }

    $('#results-list').removeClass('hidden');
    console.log('displayResults ran');

}

function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join("&");
    console.log('formatQueryParams ran');
}

function getResults(searchTerm, maxResults){
    const params = {
        api_key:apiKey,
        stateCode:searchTerm,
        limit:maxResults
    };

    const queryString = formatQueryParams(params);
    const url =  searchURL + "?" + queryString;
    
    fetch(url)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong ${err.message}`);
    })
    
    console.log('getResults ran ' + url )     
}

function watchForm(){
    $('form').submit(event => {
        event.preventDefault();
        let searchTerm = $('#js-search-state').val();
        let maxResults = $('#js-result-count').val();
        console.log('watchForm ran');
        getResults(searchTerm, maxResults);
    });
}

$(watchForm);