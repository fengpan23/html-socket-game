/**
 * Created by fengpan on 2015/12/28.
 * Singleton
 */
module.exports = function(){
    //var SOCKET_CLIENT = "ws://192.168.1.116:3000";
    var SOCKET_CLIENT = "ws://127.0.0.1:3000";
    var ws = {};
    return {
        content: function(){
            ws = new WebSocket(SOCKET_CLIENT);
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
        },
        sendData: function(event, content){
            if(!ws.connected){
                var _this = this;
                setTimeout(function(event, content){
                    _this.sendData(event, content)
                }, 100);
                return;
            }
            var d = JSON.stringify({event: event, content: content});
            ws.send(d);
        },

    }
}