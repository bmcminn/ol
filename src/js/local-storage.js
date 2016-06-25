module.exports = function(key, val) {

    var ls = window.localStorage;


    if (key) {
        // if we've provided both parameters, set the property in localStorage
        if (val) {
            return ls.setItem(key, JSON.stringify(val));

        // we're simply getting the stored property value
        } else {
            return JSON.parse(ls.getItem(key));
        }
    }

};
