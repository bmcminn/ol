
var Handlebars = require('handlebars/runtime');


// setup helper to determine if the
Handlebars.registerHelper('eqSelected', function(a, b) {
    var radix = 10;

    a = parseInt(a, radix);
    b = parseInt(b, radix);

    if (a === b) {
        return 'selected'
    } else {
        return '';
    }
});


Handlebars.registerHelper('encodeURI', function(string) {
    return string
        .replace(/\s/g, '+')
        ;
});



module.exports = Handlebars;
