/* jshint laxbreak:true, laxcomma:true */
/* global require */
var $           = require('./libs/jquery.js')
,   _           = require('./lodash.js')
,   parseQuery  = require('./parse-query.js')
,   axios       = require('axios')
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
        Router: require('page.js')
    };

    App.$container  = $('[role="app"]');


    // setup page sizes list for controlling number of lsitings returned by API
    App.pageSizes = [
        { size: 25 }
    ,   { size: 50 }
    ,   { size: 75 }
    ,   { size: 100 }
    ];



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

        // normalize our model data
        data = _.merge({
            $el:        App.$container
        ,   model:      {}
        ,   template:   null
        ,   url:        null
        ,   cb:         function(pageModel) { return pageModel; }
        }, data);


        // create aliases to our model properties
        var $el         = data.$el
        var model       = data.model;
        var url         = data.url;
        var template    = data.template;


        // if we're targeting a URL to pull data for our view
        if (url) {

            // if we've cached the API result already, load it
            if (localStorage(url)) {
                model = _.merge(localStorage(url), model);

                // call all model mutation
                model = data.cb(model);

                localStorage(url, model);

                $el.html(template(model));

            // otherwise get the API data
            } else {
                axios.get(url)
                    .then(function(res) {
                        model = _.merge(model, res.data);

                        // call all model mutation
                        model = data.cb(model);

                        localStorage(url, model);
                        $el.html(template(model));
                    })
                ;
            }

        // render the view anyway
        } else {
            $el.html(template(model));

        }

        // console.debug('model', model);

    });


    // setup handler for changing the page size property
    $doc.on('change', '[action="pageSizeControl"]', function(e, data) {
        // update value of `per_page` value
        localStorage('per_page', e.target.value);

        _.each(App.pageSizes, function(value, index) {
            App.pageSizes[index].selected = false;
        });

        // set the active page size listing to `selected`
        var pageSize = _.findIndex(App.pageSizes, function(p) {
            return p.size == e.target.value;
        });

        App.pageSizes[pageSize].selected = true;


        // reset value of `page` to 1
        App.Router.show('/businesses/page/1');
    });





    // Register routes and their handlers
    // =================================================================

    // @sauce: https://visionmedia.github.io/page.js/
    // @sauce: http://smalljs.org/client-side-routing/page/


    // HOME PAGE HANDLER
    // -----------------------------------------------------------------

    App.Router('/', function(ctx) {

        console.debug('homepage');

        var template    = Handlebars.templates['home']
        ,   model       = {}
        ;


        // render the view
        $doc.trigger('render', {
            $el:        App.$container
        ,   model:      model
        ,   template:   template
        });

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


        // set the current page we're browsing
        if (params.page) {
            localStorage('page', params.page)
        } else {
            localStorage('page', 1);
        }

        // set the page value in our model
        model.page = localStorage('page');


        /**
         * Adding pagiation data to our model once it's been collected
         * @param  {object} model Current page model data
         * @return {object}           [description]
         */
        var cbPaginate = function(model) {

            // setup pagination object
            model.pagination = {
                currentPage: parseInt(model.page, 10)
            ,   pages: []
            };


            // parse pages model data
            for (page in model.pages) {
                var query = parseQuery(model.pages[page]);
                model.pagination[page] = '/businesses/page/' + query.page;
                model.pagination[page+'Index'] = parseInt(query.page, 10);
            }


            // Number of pages we should link to
            var numPages = 5
            ,   splitSize = Math.floor(numPages/2)
            ;


            // set starting index for page numbers in our list
            var startIndex = 1;

            // determine the lower bound of our paging range
            if (model.pagination.currentPage - splitSize > 0) {
                startIndex = model.pagination.currentPage - splitSize;
            }


            // determine the upper bound of our paging range
            if (model.pagination.currentPage + (numPages - splitSize) > model.pagination.lastIndex + 1) {
                startIndex = model.pagination.lastIndex + 1 - numPages;
            }

            // if we're on the last page, then model.pagination.lastIndex doesn't exist, check prevIndex in this case
            if (!model.pagination.lastIndex && model.pagination.currentPage + (numPages - splitSize) >= model.pagination.prevIndex + 1) {
                startIndex = model.pagination.prevIndex + 2 - numPages;
            }



            // generate pages list
            for (var i=0; i < numPages; i++) {

                var currentIndex = startIndex + i
                ,   isCurrent = false
                ;

                if (currentIndex === model.pagination.currentPage) {
                    isCurrent = true;
                }

                model.pagination.pages.push({
                    index: currentIndex
                ,   url: '/businesses/page/' + currentIndex
                ,   current: isCurrent
                });
            }

            // write our mutations back to the model object
            return model;
        }


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
        ,   cb:         cbPaginate
        });

    };


    App.Router('/businesses',             businessHandler);
    App.Router('/businesses/page/:page',  businessHandler);



    // BUSINESS PROFILE HANDLER
    // -----------------------------------------------------------------

    App.Router('/businesses/:id', businessProfileHandler = function(ctx) {

        console.debug('business profile page');

        var params      = ctx.params
        ,   url         = [Api.Routes.businesses, params.id].join('/')
        ,   template    = Handlebars.templates['business-profile']
        ;

        var model = {};


        // set the page value in our model
        model.page = localStorage('page');


        // render the view
        $doc.trigger('render', {
            $el:        App.$container
        ,   model:      model
        ,   template:   template
        ,   url:        url
        });

    });


    // initialize App.Router() instance
    App.Router.start();




    // Run misc UI features
    // =================================================================

    // update copyright date in footer
    d = new Date();
    $('[date="year"]').text(d.getFullYear());


})();
