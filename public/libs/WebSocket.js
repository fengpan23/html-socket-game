module.exports = function () {
    var Event = require('./Event')();

    return _.extend({
        connect: function (ip, port) {
            this.ws = new WebSocket("ws://" + ip + ":" + port);
            var _this = this;
            this.ws.onopen = function () {
                _this.ws.connected = true;
                // use this to connected game indirection
                _this.trigger('connected');
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
                //when use html-socket trigger connected after receive connected data
                //if(message.state === 'connected'){
                //    return Client.trigger('connected');
                //}
                _this.trigger('message', message);
            };
        },

        send: function (event, content) {
            if (this.ws.connected && event) {
                this.ws.send(JSON.stringify({event: event, content: content || {}}));
            }
        },

        close: function () {
            this.ws.close();
        }
    }, Event);
};