"use strict";
const HSocket = require('html-socket'),
    url = require('url'),
    express = require('express'),
    app = express(),
    port = 3000;

//app.use(function (req, res, next) {
//    console.log(req.url);
//    //res.send({ msg: "hello" });
//    next();
//});
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));

app.listen(port, function (){console.log('Listening on ' + port)});

let client = new HSocket.createClient({
    ip: 'localhost',
    gamePort: 8888,
    webPort: port
});
client.on('error', function () {
    console.log('create html webSocket error !!!');
});
process.on('unCaughtException', function(err) {
    console.log(err);
    process.exit(0);
});
