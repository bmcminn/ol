
// initialize a singleton of window.api
var api = window.api || {};


var axios   = require('axios')
;


// axios.defaults.baseURL = 'http://ec2-54-84-251-148.compute-1.amazonaws.com';
axios.defaults.baseURL = 'http://localhost:8080/api/';

/**
 * Extends API object with Axios' .get() method
 * @param  {string}     queryPath   Relative API path of the current api.host property
 * @return {promise}                Promise to be resolved once the API server has responded
 */
api.get = function(queryPath) {
    return axios.get(queryPath);
};


// export the api instance
module.exports = api;
