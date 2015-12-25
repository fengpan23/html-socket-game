module.exports = function(Application) {
    var Components = {
        _modules: {
            //header: require('./header.js')(Application),
            //home: require('./home.js')(Application),
            //login: require('./login.js')(Application),
            //publisher: require('./publisher.js')(Application),
            //statCard: require('./statCard.js')(Application),
            //pubStatTable: require('./pubStatTable.js')(Application),
            //agent: require('./agent.js')(Application),
            //slot: require('./slot.js')(Application),
            //advertisers: require('./advertisers.js')(Application),
            //pagination: require('./pagination.js')(Application),
            //userinfo: require('./userinfo.js')(Application),
            //dsp: require('./dsp.js')(Application),
            //dspTemplate: require('./dspTemplate.js')(Application),
            //admin: require('./admin.js')(Application),
            //slotInfo: require('./slotInfo.js')(Application)
        }
    };

    Components.get = function(name) {
        return this._modules[name];
    };

    Components.getModules = function() {
        return this._modules;
    };

    Components.setView = function(key, value) {
        this._modules[key].view = value;
    };

    Components.setModel = function(key, value) {
        this._modules[key].model = value;
    };

    return Components;
};