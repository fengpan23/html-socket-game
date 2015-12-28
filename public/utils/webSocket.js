/**
 * Created by fengpan on 2015/12/28.
 */
module.exports = function(){
    var ws = new WebSocket("ws://127.0.0.1:8000");
    console.log('init web socket');
    ws.sendmessage = function(data){
        var d = JSON.stringify(data);
        this.send(d);
    }
    ws.onopen = function(){
        console.log('open');
        ws.sendmessage({aa: 123});
//        setTimeout(function(){
//            ws.close();
//        }, 5000);
    };

    ws.onmessage = function(evt){
        console.log(evt.data)
    };

    ws.onclose = function(evt){
        console.log('WebSocketClosed!', evt);
    };

    ws.onerror = function(evt){
        console.log('WebSocketError!');
    };
    return ws;
}