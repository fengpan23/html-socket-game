module.exports = function(App) {
    var m = App.m;
    return function(chess) {

        return m('DIV.chinese-chess-chessboard', chess.flash().map(function (c, p) {
            console.log('c', c, ' p', p);

            return m('span', {class: c, style: {top: p.y, left: p.x}})
        }))
    }
};