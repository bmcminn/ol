
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
].join('\n');

fs.write(path.resolve(process.cwd(), '.env'), envContents);
