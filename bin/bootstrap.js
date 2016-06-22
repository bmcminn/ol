
var path    = require('path')
,   fs      = require('grunt').file
;


fs.mkdir(path.resolve(process.cwd(), 'public', 'css'));
fs.mkdir(path.resolve(process.cwd(), 'logs'));


// setup environment file
var envContents = [
    '# Flip flop these values to trigger production builds in webpack'
,   'NODE_ENV=local'
,   '#NODE_ENV=production'
,   ''
,   '# Set the physical server address for your API instance'
,   'API_URL = YOUR_API_ROUTE_HERE'
,   ''
,   '# Set whether the local dev server should use the API proxy handler'
,   'USE_API_PROXY=false'
].join('\n');

fs.write(path.resolve(process.cwd(), '.env'), envContents);
