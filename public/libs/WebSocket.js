module.exports = function () {
    //var SOCKET_CLIENT = "ws://192.168.1.116:3000";
    var SOCKET_CLIENT = "ws://127.0.0.1:3000";
    var Event = require('./Event')();
    var Client = {
        connect: function (cb) {
            this.ws = new WebSocket(SOCKET_CLIENT);
            var _this = this;
            this.ws.onopen = function () {
                _this.ws.connected = true;

            };
            this.ws.onclose = function () {
                console.log('WebSocketClosed!');
            };
            this.ws.onerror = function () {
                console.log('WebSocketError!');
            };
            this.ws.onmessage = function (e) {
                var message = {};
                try {
                    message = JSON.parse(e.data);

                } catch (e) {
                    console.log('parse receive data error !!!', e);
                }
                if(message.state === 'connected'){
                    return Client.trigger('connected');
                }
                Client.trigger('data', message);
            };

        },
        send: function (event, content) {
            if (this.ws.connected && event) {
                this.ws.send(JSON.stringify({event: event, content: content}));
            }
        },
        close: function () {
            this.ws.close();
        }
    };
    _.extend(Client, Event);
    return Client;
};