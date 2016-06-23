
var Handlebars  = require('./libs/handlebars.js')
,   templates   = require('./templates.json')
;

var compiled = {};

for (template in templates) {
    Handlebars.templates[template] = Handlebars.compile(templates[template]);
}

Handlebars.partials = Handlebars.templates;

module.exports = Handlebars;

