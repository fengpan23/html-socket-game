"use strict";
let webSocketServer = require('ws').Server;
let wss = new webSocketServer({port: 8000});

wss.on('connection', function connection(ws) {
    console.log('conent');
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        console.log('buffer', new Buffer('woca'));
        ws.send('woca');
    });
    ws.on('close', function close() {
        console.log('disconnected');
    });
    //ws.send('something');
});

var url = require('url');
var http = require('http');
var path = require('fast-path');
var createStatic = require('connect-static');

let dynamicRouterMap = {
}
function onRequest(request, response) {
    if ('POST' === request.method) {
        response.status = 204;
        return response.end();
    }

    if ('/favicon.ico' === path.resolve(request.url)) {
        response.status = 204;
        return response.end();
    } else {
        let u = url.parse(request.url, true);
        var urlParts = u.pathname.split('/').filter(Boolean);
        console.log('url parts : ', urlParts);

        if (undefined === dynamicRouterMap[urlParts[0]]) {
            response.status = 204;
            return response.end();
        } else {
            dynamicRouterMap[urlParts[0]](request, response);
        }
    }
}

function start(port, host, callback) {
    //port = port || global.config.port;
    //host = host || global.config.host;
    port = 3000;
    host = '0.0.0.0';
    var options = {
        dir: 'public',
        aliases: [
            ['/', '/index.html']
        ]
    };
    createStatic(options, function (error, staticMiddleware) {
        if (error) throw error;

        var server = http.createServer(function (req, res) {
            staticMiddleware(req, res, onRequest.bind(null, req, res));
        })
            .listen(port, host, function () {
                console.info('Server running at ' + host + ':' + port);
                console.info('App version: ' + require('./package.json').version);
                callback && callback(server);
            });
    });
}

process.on('unCaughtException', function(err) {
    console.log(err);
    process.exit(0);
});

exports.start = start;
if (module.parent === null) {
    start();
}
