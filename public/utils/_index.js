module.exports = function(App) {
    var Util = {
        _utils: {
            engine: require('./engine.js')(App),
            modal: require('./modal.js')(App)
        }
    };
    Util.get = function(name) {
        return this._utils[name];
    };
    Util.getUtils = function() {
        return this._utils;
    };
    return Util;
};