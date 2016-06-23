
var $       = require('zepto-webpack')
,   page    = require('page.js')
;


$(document).ready(function() {


    var api = require('./api.js');


    var app = require('./app.js');


    // register routes and route handlers
    page('/',                           app.routes.home);
    page('/businesses',                 app.routes.businesses);
    page('/businesses/page/:index',     app.routes.businesses);
    page('/businesses/:id',             app.routes.businessListing);


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
