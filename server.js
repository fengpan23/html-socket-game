"use strict";

let server = require('http').createServer()
    , url = require('url')
    , WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({server: server})
    , express = require('express')
    , app = express()
    , port = 3000;

//app.use(function (req, res) {
//    res.send({ msg: "hello" });
//});
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'))

wss.on('connection', function connection(ws) {
    var location = url.parse(ws.upgradeReq.url, true);
    //console.log('location', location);
    // you might use location.query.access_token to authenticate or share sessions
    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
    });

    ws.send('something');
});

server.on('request', app);
server.listen(port, function (){console.log('Listening on ' + server.address().port)});

process.on('unCaughtException', function(err) {
    console.log(err);
    process.exit(0);
});
