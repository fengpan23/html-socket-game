module.exports = function(App) {
    return function () {
        var ws = App.Util.get('ws')();
        require('./chessboard.js');
        var chess = {
            chessman: [],
            getComponent: function (){
                return require('../user.js')(App, ws);
            }
        };
        chess.drawBoard = function (e, isInit) {
            console.log('isInit', isInit);
            if(!chess.board){
                chess.board = ChessBoard('chessboard', {
                    draggable: true,
                    dropOffBoard: 'trash',
                    sparePieces: true
                });
            }
        };
        chess.ready = function (e) {
            console.log('ready .........', e);
            chess.board.start(e);
        };
        chess.leave = function () {

        };
        chess.clickBoard = function(){

        };
        chess.clickChess = function(){

        };
        return chess;
    };
};