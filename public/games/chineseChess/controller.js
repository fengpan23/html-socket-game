module.exports = function(App, Opts) {
    var m = App.m;
    return function(){
        var client = App.Util.get('engine');

        client.on('init', function (data) {
            //TODO: start timeout user ready
            console.log(data);
        });
        client.init(Opts);

        var chess = {
            chessman: [],
            adaptive: function (x, y) {
                var _x = Math.floor((x - 25) / 85) + 1;
                var _y = 11 - Math.floor((y - 30) / 78) + 96;
                return ''+ _x + String.fromCharCode(_y);
            },
            getComponent: function (){
                return require('../user.js')(App);
            }
        };

        chess.ready = function () {

            client.onData = function (ches) {
                console.log('ches', ches);
                //ches && chess.flash(ches);
                //m.redraw();
            }

            client.send('userjoin', {seatindex: 1});
        };
        chess.leave = function () {
            //TODO close the game socket
            m.route('/home');
        };
        chess.clickChess = function (e) {
            var chessman = e.target.id;
            client.sendData({id: 0, event: 'selecting', content: {chessman:chessman}});
            e.stopPropagation();
        };
        chess.clickBoard = function (e) {
            var coordinate = chess.adaptive(e.x, e.y);
            ws.sendData({id: 0, event: 'moving', content: {coordinate: coordinate}});
        };
        chess.flash = function (chessman) {
            chess.chessman = [];
            for(var c in chessman) {
                if (chessman[c]) {
                    var ch = [c.slice(0, 1).toLowerCase(), c.split('_')[1]].join('_');
                    var position = chessman[c].split("");
                    chess.chessman.push([ch, {
                        x: (+position[0] - 1) * 85 + 15,
                        y: (10 - position[1].charCodeAt() + 96) * 78 + 20
                    }, c]);
                }
            }
        }
        return chess;
    }
};