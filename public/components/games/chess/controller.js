module.exports = function(App, options) {
    var m = App.m;
    return function () {
        require('./chessboard.js');
        var ws = App.Util.get('ws');

        ws.sendData("login", {
            tableid : options.tableID,
            gameid : App.config[options.gameName].id,
            session : App.session
        });
        //TODO add table list when choose table  sitdown
        //ws.sendData('sitdown');

        ws.onData = function (data) {
            console.log('receive data: ', data);
            event[data.event] && event[data.event].call(data);
        };
        var event = {
            sitdown: function(data){
                console.log('user sitdown', data);
            },
            ready: function(data) {
                console.log('user ready', data);
            }
        };
        var removeGreySquares = function() {
            $('#board .square-55d63').css('background', '');
        };
        var greySquare = function(square) {
            var squareEl = $('#board .square-' + square);

            var background = '#a9a9a9';
            if (squareEl.hasClass('black-3c85d') === true) {
                background = '#696969';
            }
            squareEl.css('background', background);
        };
        var onDragStart = function(){
            // do not pick up pieces if the game is over
            // or if it's not that side's turn
            if (game.game_over() === true ||
                (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
                (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
                return false;
            }
        };
        var onDrop = function(source, target) {
            removeGreySquares();
            // see if the move is legal
            var move = game.move({
                from: source,
                to: target,
                promotion: 'q' // NOTE: always promote to a queen for example simplicity
            });
            // illegal move
            if (move === null) return 'snapback';
        };
        var onMouseoverSquare = function(square, piece) {
            // get list of possible moves for this square
            var moves = game.moves({
                square: square,
                verbose: true
            });

            // exit if there are no moves available for this square
            if (moves.length === 0) return;

            // highlight the square they moused over
            greySquare(square);

            // highlight the possible squares for this piece
            for (var i = 0; i < moves.length; i++) {
                greySquare(moves[i].to);
            }
        };
        var onMouseoutSquare = function(square, piece) {
            removeGreySquares();
        };
        var onSnapEnd = function() {
            board.position(game.fen());
        };

        var chess = {
            chessman: [],
            getComponent: function (name){
                return require('../'+ name +'.js')(App, ws);
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
        chess.ready = function (e) {
            ws.sendData('ready', {seatindex: 2});
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