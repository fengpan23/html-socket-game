/**
 * Proxy of models
 * @param  {[type]} Application [description]
 * @return {[type]}             [description]
 */
module.exports = function(Application) {
    var Model = {
        _models: {
            //home: require('./home.js')(Application),
            //session: require('./session.js')(Application),
            //slot: require('./slot.js')(Application),
            //pubStats: require('./pubStats.js')(Application),
            //agent: require('./agent.js')(Application),
            //revenue: require('./revenue.js')(Application),
            //user: require('./user.js')(Application),
            //dsp: require('./dsp.js')(Application)
        }
    };

    Model.get = function(name) {
        return this._models[name];
    };

    Model.getModels = function() {
        return this._models;
    };

    return Model;

};


