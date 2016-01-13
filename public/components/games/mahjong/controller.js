module.exports = function(App, options) {
    return function () {
        var event = {
            sitdown: function(data){
                console.log('user sitdown', data);
            },
            ready: function(data) {
                console.log('user ready', data);
            },
            start: function(data){
                console.log('game start', data);
                //chess.board.start();
            }
        };
        var engine = App.Util.get('engine');
        engine.init(options);
        engine.on('data', function(data) {
            console.log('receive data: ', data);
            this[data.event] && this[data.event].call(data);
        }, event);

        var mahjong = {
            getComponent: function (name){
                return require('../'+ name +'.js')(App, engine);
            }
        };
        mahjong.leave = function () {

        };
        return mahjong;
    };
};