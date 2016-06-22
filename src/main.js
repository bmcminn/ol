
var $       = require('zepto-webpack')
// ,   _       = require('lodash')
,   Page    = require('page.js')
,   axios   = require('axios')
,   url     = require('url')
;


$(document).ready(function() {

    // axios.defaults.baseURL = 'http://ec2-54-84-251-148.compute-1.amazonaws.com';
    axios.defaults.baseURL = 'http://localhost:8080/api/';

    // setup window API object so we can test from the browser console
    window.api = {};


    /**
     * Extends API object with Axios' .get() method
     * @param  {string}     queryPath   Relative API path of the current api.host property
     * @return {promise}                Promise to be resolved once the API server has responded
     */
    api.get = function(queryPath) {
        return axios.get(queryPath);
    };


    var $app = $('[role="app"]')
    ;


    // get businesses data
    api.get('/businesses')
        .then(function (response) {
            console.log('response.data', response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        ;

});
