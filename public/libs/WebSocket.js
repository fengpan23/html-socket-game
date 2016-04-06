module.exports = function () {
    var Event = require('./Event')();
    var ws;

    return _.extend({
        connect: function (ip, port) {
            var _this = this;
            ws = new WebSocket("ws://" + ip + ":" + port);
            ws.onopen = function () {
                ws.connected = true;
                // use this to connected game indirection
                _this.trigger('connected');
            };
            ws.onclose = function () {
                console.log('WebSocketClosed!');
            };
            ws.onerror = function () {
                console.log('WebSocketError!');
            };
            ws.onmessage = function (e) {
                var message = {};
                try {
                    message = JSON.parse(e.data);
                } catch (e) {
                    console.log('parse receive data error !!!', e);
                }
                //when use html-socket trigger connected after receive connected data
                //if(message.state === 'connected'){
                //    return Client.trigger('connected');
                //}
                _this.trigger('message', message);
            };
        },

        send: function (event, content) {
            if (ws.connected && event) {
                ws.send(JSON.stringify({id: 0, event: event, content: content || {}}));
            }
        },

        close: function () {
            ws.close();
        }
    }, Event);
};