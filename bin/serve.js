
/**
 * Node static instance script
 * @sauce: https://github.com/cloudhead/node-static
 */
var static  = require('node-static')
,   path    = require('path')
,   log     = require('simple-node-logger').createSimpleLogger(path.resolve(process.cwd(), 'logs', 'project.log'))
;


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
    request.addListener('end', function () {
        // Serve files!
        fileServer.serve(request, response, function (err, res) {
            if (err && (err.status === 404)) { // If the file wasn't found
                fileServer.serveFile('/not-found.html', 404, {}, request, response);
            }
        });
    }).resume();
}).listen(serverConfig.port);
