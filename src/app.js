
// initialize app object singleton
var app = window.app || {};

app.container   = $('[role="app"]');
app.routes      = {};


// home route definition
app.routes.home = function(ctx) {
    var params = ctx.params;

    console.log('home page');
    console.debug('ctx:', ctx);
};


// businesses route definition
app.routes.businesses = function(ctx) {
    var params = ctx.params;

    // are we on a paged index?
    if (params.index) {
        console.debug('businesses page', params.index);

    // show the initizl listing page
    } else {
        console.debug('businesses page');

    }

    console.debug('ctx:', ctx);
};


// business listing route definition
app.routes.businessListing = function(ctx) {
    var params = ctx.params;

    console.log('business profile page');
    console.debug('ctx:', ctx);
};


// export app singleton instance
module.exports = app;
