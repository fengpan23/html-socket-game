"use strict";
let HSocket = require('html-socket'),
    url = require('url'),
    express = require('express'),
    app = express(),
    port = 3000;

//app.use(function (req, res) {
//    res.send({ msg: "hello" });
//});
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));

app.listen(port, function (){console.log('Listening on ' + port)});


let client = new HSocket.createClient({
    ip: '127.0.0.1',
    gamePort: 8888,
    webPort: port
});
client.on('error', function () {
    console.log('create html webSocket error !!!');
})
process.on('unCaughtException', function(err) {
    console.log(err);
    process.exit(0);
});
