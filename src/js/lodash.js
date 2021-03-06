

var _ = require('lodash/core');


_.merge             = require('lodash/merge');
_.isPlainObject     = require('lodash/isplainobject');
_.isObject          = require('lodash/isObject');
_.isArray           = require('lodash/isArray');
_.isInteger         = require('lodash/isinteger');
_.isNumber          = require('lodash/isnumber');
_.findIndex         = require('lodash/findindex');


/**
 * Serializes object data
 * @param  {object} data      Object data to be serialized
 * @param  {string} delimiter Optional: Defaults to a comma (,) if not defined, OR if is empty string
 * @return {string}           Serialized object data concatenated with the string delimiter
 */
_.serialize = function(data, delimiter) {

    // validate data is an object
    if (!_.isObject(data) && !_.isArray(data)) {
        return false;
    }

    // default delimiter to a comma if it isn't defined, OR if it's an empty string
    if (!delimiter || delimiter === '') {
        delimiter = ',';
    }

    // init serialization collection
    var string = [];

    // iterate over each property in the array
    _.each(data, function(value, key) {

        // concatenate the key/value pair and push into our serialization string collection
        string.push([key,'=',value].join(''));
    });

    // concatenate using our delimiter
    string = string.join(delimiter).toString();

    // return the serialized data
    return string;

};


module.exports = _;
