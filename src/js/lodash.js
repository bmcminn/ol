

var _ = require('lodash');


/**
 * Serializes object data
 * @param  {object} data      Object data to be serialized
 * @param  {string} delimiter Optional: Defaults to a comma (,) if not defined, OR if is empty string
 * @return {string}           Serialized object data concatenated with the string delimiter
 */
_.serialize = function(data, delimiter) {

    // validate data is an object
    if (!this.isObject(data)) {
        return false;
    }

    // default delimiter to a comma if it isn't defined, OR if it's an empty string
    if (!delimiter || delimiter === '') {
        delimiter = ',';
    }

    // init serialization collection
    var string = [];

    // iterate over each property in the array
    this.each(data, function(value, key) {

        // concatenate the key/value pair and push into our serialization string collection
        string.push([key,'=',value].join(''));
    });

    // return the serialized data concatenated using our delimiter
    return string.join(delimiter);

};


module.exports = _;
