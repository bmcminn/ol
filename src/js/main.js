/* jshint laxbreak:true, laxcomma:true */
/* global require */
var $       = require('./libs/jquery.js')
,   page    = require('page.js')
,   axios   = require('axios')
,   _       = require('./lodash.js')
;

// initialize window instances for client console use
window.$ = $;


(function() {


    // Setup Handlebars instance
    // =================================================================

    var Handlebars = require('./handlebars.js');

    // call in the precompiled handlebars files
    require('./template-files.js')

    // trick handlebars into using the precompiled templates as partials
    Handlebars.partials = Handlebars.templates;


    // Setup Application instance container
    // =================================================================

    var App = {

    };

    App.$container  = $('[role="app"]');


    // setup page sizes list for controlling number of lsitings returned by API
    App.pageSizes = [25,50,75,100];



    // Setup API instance config
    // =================================================================

    var Api = {
        meta: {}
    ,   Routes: {}
    };

    Api.meta.docsPath               = 'https://path.to/our/api/docs/specs';
    Api.meta.maxResultsLength       = 200;
    Api.meta.defaultResultsLength   = 50;


    // setup API routes
    Api.Routes.businesses = '/businesses'

    // setup Axios default parameters
    axios.defaults.baseURL = 'http://localhost:8080/api/';



    // Setup localStorage helper and default runtime properties
    // =================================================================

    // expose a window global for console testing
    var localStorage = window.ls = require('./local-storage.js');


    // default per_page parameter if not already set
    if (!localStorage('per_page')) {
        localStorage('per_page', Api.meta.defaultResultsLength);

    // validate that per_page is set to a maxium value per our API spec
    } else {
        if (localStorage('per_page') > Api.meta.maxResultsLength) {
            localStorage('per_page', Api.meta.maxResultsLength);
            console.warn('Property `per_page` must be no larger than 200 per API spec:', Api.meta.docsPath);
        }
    }



    // Setup event bus and handlers
    // =================================================================

    var $doc = $(document);

    // setup render
    $doc.on('render', renderFile = function(e, data) {

        var $el         = data.$el
        var model       = data.model;
        var url         = data.url;
        var template    = data.template;

        // if we've cached the API result already, load it
        if (localStorage(url)) {
            model = _.merge(localStorage(url), model);
            $el.html(template(model));

        // otherwise get the API data
        } else {
            axios.get(url)
                .then(function(res) {
                    model = _.merge({model: model}, res.data);
                    localStorage(url, model);
                    $el.html(template(model));
                })
            ;
        }
    });


    // setup handler for changing the page size property
    $doc.on('change', '[action="pageSizeControl"]', function(e, data) {
        localStorage('per_page', e.target.value);
        page(window.location.pathname);
    });





    // Register routes and their handlers
    // =================================================================

    // @sauce: https://visionmedia.github.io/page.js/
    // @sauce: http://smalljs.org/client-side-routing/page/


    // HOME PAGE HANDLER
    // -----------------------------------------------------------------

    page('/', function(ctx) {

        console.debug('homepage');

        // var params      = ctx.params
        // ,   template    = Handlebars.templates['business-listing']
        // ;

        // var model = {

        // };

        // App.$container.html(template(model));

    });



    // BUSINESS LISTING HANDLER
    // -----------------------------------------------------------------

    var businessHandler = function(ctx) {

        console.debug('business list page');

        var params      = ctx.params
        ,   url         = Api.Routes.businesses
        ,   template    = Handlebars.templates['business-listing']
        ,   model       = {}
        ;

        model.per_page = params.per_page = localStorage('per_page');


        // establish page sizes and ensure they're sorted accordingly
        model.pageSizes = App.pageSizes.sort(function(a, b) { return a - b; });

        // setup a paged route regardless so we can cache things more accurately
        url += encodeURIComponent('?' + _.serialize(params, '&'));


        // render the view
        $doc.trigger('render', {
            $el:        App.$container
        ,   model:      model
        ,   template:   template
        ,   url:        url
        });

    };

    page('/businesses', businessHandler);
    page('/businesses/page/:page', businessHandler);



    // BUSINESS PROFILE HANDLER
    // -----------------------------------------------------------------

    page('/businesses/:id', businessProfileHandler = function(ctx) {

        console.debug('business profile page');

        var params      = ctx.params
        ,   url         = [Api.Routes.businesses, params.id].join('/')
        ,   template    = Handlebars.templates['business-profile']
        ;

        model = {};

        // render the view
        $doc.trigger('render', {
            $el:        App.$container
        ,   model:      model
        ,   template:   template
        ,   url:        url
        });

    });


    // initialize page() instance
    page.start();


})();
