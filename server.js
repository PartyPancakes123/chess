var serverBoard;

var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var port = 3000;

http.listen(port, function() {
    console.log('listening on *: ' + port);
});

// setup my socket server
var io = require('socket.io')(http);
//console.log(io);

io.sockets.on('connection', function(socket) {
    console.log('New connection');

    socket.on('moveHappened', function(board) {
        serverBoard = board;
        io.sockets.emit('boardReceived', serverBoard);
    })
});
