/**
 * Created by fengpan on 2015/12/28.
 */
module.exports = function(){
    var ws = new WebSocket("ws://192.168.1.116:3000");
    console.log('init web socket');
    ws.sendmessage = function(data){
        var d = JSON.stringify(data);
        console.log(d);
        this.send(d);
    }
    ws.onopen = function(){
        console.log('open');
        //var data = {id: 0, event: 'initchinesechess', content:  {session: '8tienlenfW8CcbEIBkQ2pC32X6mmNCcE', gameid: 10000005, tableid: 67}};
        //ws.sendmessage(data);
        //ws.send(data);
//        setTimeout(function(){
//            ws.close();
//        }, 5000);
    };

    //ws.onmessage = function(evt){
    //    console.log('message', evt)
    //
    //    console.log(evt.data)
    //};

    ws.onclose = function(evt){
        console.log('WebSocketClosed!', evt);
    };

    ws.onerror = function(evt){
        console.log('WebSocketError!');
    };
    return ws;
}