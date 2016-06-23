/* jshint laxbreak:true, laxcomma:true */
/* global require */
var $       = require('./libs/jquery.js')
,   page    = require('page.js')
,   axios   = require('axios')
,   _       = require('./lodash.js')
;

window.$ = $;


$(document).ready(function() {

    var localStorage    = require('./local-storage.js')
    ,   Handlebars      = require('handlebars/runtime')
    ;

    // call in the precompiled handlebars files
    require('./template-files.js')

    // trick handlebars into using the precompiled templates as partials
    Handlebars.partials = Handlebars.templates;



    var app = {};

    app.$container  = $('[role="app"]');


    axios.defaults.baseURL = 'http://localhost:8080/api/';


    // register routes and their handlers
    // @sauce: https://visionmedia.github.io/page.js/
    // @sauce: http://smalljs.org/client-side-routing/page/


    /**
     * HOME PAGE HANDLER
     * @param  {[type]} ctx) {                   var params [description]
     */
    page('/', function(ctx) {

        console.debug('homepage');

        // var params      = ctx.params
        // ,   template    = Handlebars.templates['business-listing']
        // ;

        // var model = {

        // };

        // app.$container.html(template(model));

    });



    /**
     * BUSINESS LISTING HANDLER
     * @param  {[type]} ctx [description]
     */
    var businessHandler = function(ctx) {

        console.debug('business list page');

        var params      = ctx.params
        ,   url         = '/businesses/'
        ,   template    = Handlebars.templates['business-listing']
        ,   model       = {}
        ;


        // if we're on a paged resource
        if (params.index && params.index !== "0") {
            url += '?page=' + params.index;

        }


        // if we've cached the API result already, load it
        if (localStorage(url)) {
            app.$container.html(template(localStorage(url)));

        // otherwise get the API data
        } else {
            axios.get(url)
                .then(function(res) {
                    localStorage(url, res.data);
                    app.$container.html(template(res.data));
                })
            ;
        }

    };

    page('/businesses', businessHandler);
    page('/businesses/page/:index', businessHandler);



    /**
     * BUSINESS PROFILE HANDLER
     * @param  {[type]} ctx) {                   var params [description]
     */
    page('/businesses/:id', function(ctx) {

        console.debug('business profile page');

        var params      = ctx.params
        ,   url         = '/businesses/' + params.id
        ,   template    = Handlebars.templates['business-profile']
        ;

        if (localStorage(url)) {
            app.$container.html(template(localStorage(url)));

        } else {
            axios.get(url)
                .then(function(res) {
                    localStorage(url, res.data);
                    app.$container.html(template(res.data));
                })
            ;
        }

    });



    // on page (re)load, trigger the route in question + any query parameters
    // page(window.location.pathname + window.location.search);


    // configure page() instance
    page.start();


});
