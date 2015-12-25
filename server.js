"use strict";
let webSocketServer = require('ws').Server
let wss = new webSocketServer({port: 8000});

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });
    ws.on('close', function close() {
        console.log('disconnected');
    });
    ws.send('something');
});