module.exports = function(App, options) {
    require('./chessboard');
    return function () {
        //var hander = require('./hander');
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


        var chess = {
            getComponent: function (name){
                return require('../'+ name +'.js')(App, engine);
            }
        };
        chess.drawBoard = function () {
            if(!chess.board){
                chess.board = ChessBoard('chessboard', {
                        draggable: true,
                        //onDragStart: onDragStart,
                        //onDrop: onDrop,
                        //onMouseoutSquare: onMouseoutSquare,
                        //onMouseoverSquare: onMouseoverSquare,
                        //onSnapEnd: onSnapEnd
                });
            }
        };
        chess.leave = function () {

        };
        return chess;
    };
};