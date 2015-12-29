module.exports = function(App) {
    var m = App.m;
    return function(){
        var chess = {}
        chess.ready = function (e) {
            var ws = App.Util.get('ws');
            var data = {id: 0, event: 'initchinesechess', content:  {session: '8tienlenfW8CcbEIBkQ2pC32X6mmNCcE', gameid: 10000005, tableid: 67}};
            //ws.sendmessage(data);
            //ws.onmessage = function (e) {
            //var ches = JSON.parse(e.data);
            setTimeout(function(){
                var ches = {
                    B1_adviser: "4j",
                    B1_cannon: "2h",
                    B1_chariot: "1j",
                    B1_elephant: "3j",
                    B1_horse: "2j",
                    B1_pawns: "1g",
                    B2_adviser: "6j",
                    B2_cannon: "8h",
                    B2_chariot: "9j",
                    B2_elephant: "7j",
                    B2_horse: "8j",
                    B2_pawns: "3g",
                    B3_pawns: "5g",
                    B4_pawns: "7g",
                    B5_pawns: "9g",
                    B_king: "5j",
                    R1_adviser: "4a",
                    R1_cannon: "2c",
                    R1_chariot: "1a",
                    R1_elephant: "3a",
                    R1_horse: "2a",
                    R1_pawns: "1d",
                    R2_adviser: "6a",
                    R2_cannon: "8c",
                    R2_chariot: "9a",
                    R2_elephant: "7a",
                    R2_horse: "8a",
                    R2_pawns: "3d",
                    R3_pawns: "5d",
                    R4_pawns: "7d",
                    R5_pawns: "9d",
                    R_king: "5a"}
                chess.ches = ches;
                ches && chess.flash();
                m.redraw();
            }, 2000)
        };
        chess.startInit = function () {

        };
        chess.flash = function (e) {
            var data = chess.ches;
            var ct = [];
            if(data) {
                for(var k in data){
                    var kk = [k.slice(0, 1).toLowerCase(), k.split('_')[1]].join('_');
                    var p = data[k].split("");
                    var t = {};
                    ct.push([kk, {x: p[0], y: 1}]);
                }
            }
            console.log('ct', ct);
            return ct;
        }
        return chess;
    }
};