"use strict";
const crypto = require('crypto');
const util = require('util');
const events = require('events');
const net = require('net');
const parser = require('./lib/parser');

const WSKEY = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

class Server{
    constructor() {
        events.EventEmitter.call(this);
    };

    /**
     * create html websocket server
     * @param  {[type]} options [description]
     */
    createServer(options) {
        net.createServer(function(socket) {
            //TODO deal with browser refresh problem
            socket.on('data', function (data) {
                console.log(data.length);
                if(!socket.key){
                    console.log('shake hand'); //data.toString()
                    let clientKey = data.toString().match(/Sec-WebSocket-Key: (.+)/)[1];
                    let key = crypto.createHash('sha1').update(clientKey + WSKEY).digest('base64');
                    socket.key = key;
                    socket.write('HTTP/1.1 101 Switching Protocols\r\n');
                    socket.write('Upgrade: websocket\r\n');
                    socket.write('Connection: Upgrade\r\n');
                    socket.write('Sec-WebSocket-Accept: ' + key + '\r\n');
                    socket.write('\r\n');
                }else{
                    parser.write(data);
                }
            });
            socket.on('error', (err) => {
            });
            socket.on('end', function() {
                console.log('client disconnected');
            });

            parser.on('message', function(data){
                console.log('parser data', data);
            });
        }).listen(options.port || 8000, function() {
            console.log('Html socket server bound at port: ', options.port || 8000);
        });
        return this;
    };
};
util.inherits(Server, events.EventEmitter);

module.exports = function(){
    return new Server();
};

if(require.main !== module)return;
var server = new Server();

let cl = server.createServer({});