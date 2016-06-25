
var Handlebars = require('handlebars/runtime');


// setup helper to determine if the
Handlebars.registerHelper('eqSelected', function(a, b) {
    var radix = 10;

    console.log(a, b);
    a = parseInt(a, radix);
    b = parseInt(b, radix);

    console.log('eqSelected', a, b);

    if (a === b) {
        return 'selected'
    } else {
        return '';
    }
});


module.exports = Handlebars;
