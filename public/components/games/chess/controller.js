module.exports = function(Application) {

    var chess = {}
    chess.ready = function (e) {
        console.log('ready .........', e);
    }
    return chess;
};