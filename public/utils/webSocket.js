/**
 * Created by fengpan on 2015/12/28.
 */
module.exports = function(){
    //var SOCKET_CLIENT = "ws://192.168.1.116:3000";
    var SOCKET_CLIENT = "ws://192.168.1.120:3000";
    return function () {
        var ws = new WebSocket(SOCKET_CLIENT);
        ws.sendData = function(data){
            var d = JSON.stringify(data);
            console.log(d);
            ws.send(d);
        };
        ws.onmessage = function (e) {
            var message;
            try{
                console.log('recive data: ', e.data);
                message = JSON.parse(e.data);
            }catch(e){
                console.log('parse receive data error !!!', e);
            }
            ws.onData && ws.onData(message);
        };
        ws.onopen = function(){
            console.log('open');
            ws.sendData({aaa: 132});
        };
        ws.onclose = function(evt){
            console.log('WebSocketClosed!', evt);
        };
        ws.onerror = function(evt){
            console.log('WebSocketError!');
        };
        return ws;
    };
}