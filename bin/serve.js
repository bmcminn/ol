
// initialize the local environment config
require('dotenv').load();

/**
 * Node static instance script
 * @sauce: https://github.com/cloudhead/node-static
 */
var static      = require('node-static')
,   path        = require('path')
,   fs          = require('grunt').file
,   url         = require('url')
,   execSync    = require('child_process').execSync
;


var api = {};


// create a functional alias for the Node Url lib
api.parser = require('url');


// define API proxy url
api.url = process.env.API_URL || null;


// define handler for containating API routes to base route
api.route = function(target) { return ; };



//
// Create a node-static server instance to serve the './public' folder
//

var serverConfig = {
    cache: 3600
,   dir: path.resolve(process.cwd(), 'public')
,   hostname: 'localhost'
,   port: 8080
};


var fileServer = new static.Server(serverConfig.dir, serverConfig);


console.log(`Serving "/public" at http://${serverConfig.hostname}:${serverConfig.port}`);


require('http').createServer(function (request, response) {

    // setup a proxy for the API calls
    if (process.env.USE_API_PROXY && request.url.match(/\/api\//i)) {

        var route = url.parse(request.url);
        route.path = route.path.replace(/^\/api/, '');

        var apiRoute = url.resolve(api.url, route.path);

        console.log(apiRoute);

        // execute a curl command to proxy this stuff
        var res = execSync('curl ' + apiRoute, { encoding: 'utf8' });

        // write the response back to client
        response.write(res);
        response.end();

        // break the response handler chain
        return;
    }


    // fake the server config that would load index.html as the primary router for all routes
    if (!request.url.match(/\.(?:css|js|woff2|png|gif|jpg|jpeg)/g)) {
        response.write(fs.read(path.resolve(process.cwd(), 'public', 'index.html')));
        response.end();
        return;
    }


    request.addListener('end', function () {
        fileServer.serve(request, response, function (err, res) {

            // Serve files!
            if (err && (err.status === 404)) { // If the file wasn't found
                fileServer.serveFile('/not-found.html', 404, {}, request, response);
            }
        });
    }).resume();
}).listen(serverConfig.port);
