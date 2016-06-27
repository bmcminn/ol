module.exports = function(url) {

    var query = {}
    ,   queryString = url.split('?')
    ;


    // see if we actually captured the query string
    if (queryString.length > 1) {
        queryString = queryString[1];
    } else {
        return false;
    }


    // split each query into pairs
    queryString = queryString.split('&');


    // iterate over pairs and pass them into our return object
    for (pair in queryString) {
        var parts = queryString[pair].split('=');

        query[parts[0]] = parts[1];
    }

    return query;
}
