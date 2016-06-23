
var fs          = require('grunt').file
,   _           = require('lodash')
,   path        = require('path')
,   handlebars  = require('handlebars')
;


var views = path.resolve(process.cwd(), 'views', '**.hbs')
,   templates = fs.expand(views)
,   templateFiles = {}
;


_.each(templates, function(filepath) {

    var source  = fs.read(filepath)
    ,   name    = path.basename(filepath).replace(/\..+$/i, '')
    ;

    templateFiles[name] = handlebars.compile(source);

});

console.log(templateFiles);

fs.write(path.resolve(process.cwd(), 'src', 'js', 'template-files.js'), templateFiles.toString());
