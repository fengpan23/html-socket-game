module.exports = function(App) {
    return function () {
        var ws = App.Util.get('ws')();
        var chess = {
            chessman: [],
            getComponent: function (){
                return require('../user.js')(App, ws);
            }
        };
        chess.ready = function (e) {
            console.log('ready .........', e);
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