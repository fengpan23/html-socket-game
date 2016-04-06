/**
 * Created by fengpan on 2015/12/28.
 * Singleton
 */
module.exports = function(App){
    var m = App.m;
    var event = require('../libs/Event')();
    var client = require('../libs/WebSocket')();

    var engine = {
        init: function(opts){
            var deferred = m.deferred();
            client.connect(App.config.gameServer.ip, App.config.gameServer.port);

            client.on('connected', function(){
                client.send('init', {tableid: opts.tableID, gameid: App.config.games[opts.gameName].id, session: App.session});
                deferred.resolve();
            });
            return deferred.promise;
        }
    };

    client.on('message', function (ms) {
        engine.trigger(ms.event, ms.content);
    });

    return _.extend(engine, event, client);
};