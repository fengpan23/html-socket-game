module.exports = function(Application) {
    var Util = {
        _utils: {
            ws: require('./webSocket.js')(Application),
            //modal: require('./modal.js')(Application),
            //PADLocale: require('./pickadateLocale.js')
        }
    };
    Util.get = function(name) {
        return this._utils[name];
    };
    Util.getUtils = function(key, value) {
        return this._utils;
    };
    return Util;
};