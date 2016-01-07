/**
 * Created by fengpan on 2015/12/28.
 * Singleton
 */
module.exports = function(App){
    var m = App.m;
    var event = require('../libs/Event')();
    var client = require('../libs/WebSocket')();
    var engine = {
        init: function (options) {
            this.options = options;
        },
        join: function(){
            var deferred = m.deferred();
            client.connect();
            client.on('connected', function(){
                client.send('login', {tableid: engine.options.tableID, gameid: App.config.games[engine.options.gameName].id, session: App.session});
                deferred.resolve();
            });
            client.on('data', function(data){
                engine.trigger('data', data);
            });
            return deferred.promise;
        },
        sitDown: function (index) {
            client.send('sitdown', {seatindex: index});
        },
        ready: function(){
            client.send('ready');
        },
        exit: function(){
            client.close();
        }
    };
    return _.extend(engine, event);
};