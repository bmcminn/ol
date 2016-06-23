module.exports = function(key, val) {
    if (key && val) {
        return window.localStorage.setItem(key, JSON.stringify(val));
    }

    if (!val && key) {
        return JSON.parse(window.localStorage.getItem(key));
    }
};
