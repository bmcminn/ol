
var $       = require('zepto-webpack')
// ,   _       = require('lodash')
,   Page    = require('page.js')
,   axios   = require('axios')
;


$(document).ready(function() {

    var api = {
            // host: 'http://ec2-54-84-251-148.compute-1.amazonaws.com'
            host: 'http://localhost:8080/data'

            /**
             * Extends API object with Axios' .get() method
             * @param  {string}     queryPath   Relative API path of the current api.host property
             * @return {promise}                Promise to be resolved once the API server has responded
             */
        ,   get: function(queryPath) {
                return axios.get(this.host + queryPath);
            }
        }
    ;


    var $app = $('[role="app"]')
    ;


    // get businesses data
    api.get('/businesses.json')
        .then(function (response, data) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        ;



});
