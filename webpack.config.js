
// initialize the local environment config
require('dotenv').load();


var path        = require('path')
,   entryPath   = path.resolve(__dirname, 'src', 'js', 'main.js')
,   buildPath   = path.resolve(__dirname, 'public', 'build')
,   buildName   = 'bundle.js'

,   debug       = process.env.NODE_ENV === 'production' ? false : true

,   webpack     = require('webpack')
;


// register initial webpack plugins
var plugins = [
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            filename: "common.js",
            minChunks: 2
        })
    ]
;


// if we're deploying to a production environment, run some optimizations
if (!debug) {
    plugins.push(
        new webpack.optimize.DedupePlugin()
    );

    plugins.push(
        new webpack.optimize.OccurenceOrderPlugin()
    );

    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            sourcemap: true,
            comments: false,
            compress: {
                warnings: false
            }
        })
    );
}




module.exports = {

    context: __dirname,
    devtool: debug ? 'inline-sourcemap' : null,
    entry: {
        'bundle.js': entryPath
    },
    output: {
        path: buildPath,
        filename: buildName
    },
    plugins: plugins,
    module: {
        loaders: [
            {
                test: /^\.\/.+(\.js)?$/,
                loader: 'script-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    }
}
