/**
 * Created by fengpan on 2015/12/28.
 * Singleton
 */
module.exports = function(){
    //var SOCKET_CLIENT = "ws://192.168.1.116:3000";
    var SOCKET_CLIENT = "ws://192.168.1.120:3000";
    var ws = new WebSocket(SOCKET_CLIENT);
    ws.connected = false;
    ws.sendData = function(event, content){
        if(!ws.connected){
            setTimeout(function(event, content){
                ws.sendData(event, content)
            }, 100);
            return;
        }
        var d = JSON.stringify({event: event, content: content});
        ws.send(d);
    };
    ws.onmessage = function (e) {
        var message;
        try{
            //console.log('recive data: ', e.data);
            message = JSON.parse(e.data);
        }catch(e){
            console.log('parse receive data error !!!', e);
        }
        ws.onData && ws.onData(message);
    };
    ws.onopen = function(){
        console.log('open');
        ws.connected = true;
    };
    ws.onclose = function(evt){
        console.log('WebSocketClosed!', evt);
    };
    ws.onerror = function(evt){
        console.log('WebSocketError!');
    };
    return ws;
}