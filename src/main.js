
var $       = require('zepto-webpack')
// ,   _       = require('lodash')
,   page    = require('page.js')
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


    // initialize app object instance
    var app = {
        container: $('[role="app"]')
    ,   routes: {}
    };


    // home route definition
    app.routes.home = function(ctx) {
        var params = ctx.params;

        console.log('home page');
        console.debug('ctx:', ctx);
    };


    // businesses route definition
    app.routes.businesses = function(ctx) {
        var params = ctx.params;

        console.log('businesses page');
        console.debug('ctx:', ctx);
    };


    // business listing route definition
    app.routes.businessListing = function(ctx) {
        var params = ctx.params;

        console.log('business profile page');
        console.debug('ctx:', ctx);
    };


    // register routes and route handlers
    page('/', app.routes.home);
    page('/businesses', app.routes.businesses);
    page('/businesses/page/:index', app.routes.businesses);
    page('/businesses/:id', app.routes.businessListing);


    // on intial page load, trigger the route in question
    page(window.location.pathname + window.location.search);




    // // get businesses data
    // api.get('/businesses')
    //     .then(function (res) {
    //         console.log('response.data', res.data);
    //     })
    //     .catch(function (err) {
    //         console.log(err);
    //     })
    //     ;





});
