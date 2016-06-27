
var Handlebars = require('handlebars/runtime');


Handlebars.registerHelper('encodeURI', function(string) {
    return string
        .replace(/\s/g, '+')
        ;
});


Handlebars.registerHelper('phoneUS', function(string) {

    // convert string to string for certain
    string = string.toString();

    // strip pre-existing formatting (anything that isn't a number)
    string = string.replace(/[^\d]/g, '');

    // check if we have a leading 1
    if (string.length > 10 && string.indexOf('1') === 0) {
        string = string.substr(1);
    }

    // format string according to national standard: +1 (xxx) xxx-xxxx
    return string
        .replace(/^(\d{3})/, '+1 ($1) ')    // format area code prefixed with country code and a space
        .replace(/(\d{4})$/, '-$1')         // format last 4 digits prefixed with hyphen
        ;
});


module.exports = Handlebars;
