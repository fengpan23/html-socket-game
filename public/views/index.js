module.exports = function(Application) {
    var Views = {
        _views: {
            //header: require('./header.jsx')(Application),
            //navigation: require('./navigation.jsx')(Application),
            //home: require('./home.jsx')(Application),
            //login: require('./login.jsx')(Application),
            //publisher: require('./publisher.jsx')(Application),
            //chartHeader: require('./chartHeader.jsx')(Application),
            //agent: require('./agent.jsx')(Application),
            //advertisers: require('./advertisers.jsx')(Application),
            //userinfo: require('./userinfo.jsx')(Application),
            //slot: require('./slot.jsx')(Application),
            //dsp: require('./dsp.jsx')(Application),
            //dspTemplate: require('./dspTemplate.jsx')(Application),
            //admin: require('./admin.jsx')(Application)
        }
    };
    Views.get = function(name) {
        return this._views[name];
    };
    Views.getViews = function(key, value) {
        return this._views;
    };
    return Views;
};


