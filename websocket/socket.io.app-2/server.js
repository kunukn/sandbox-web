var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var public = __dirname + "/";

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// file assets available
app.use('/', express.static(public));

io.on('connection', function(socket){
  console.log('A user connected');
  socket.emit('newConnection', {    
    color: getRandomColor()
  });

  socket.on('position', function(data){
    socket.emit('newPosition', data);  // notify component which was the messenger
    socket.broadcast.emit('newPosition', data); // broadcast all other connected
  });
});

http.listen(3000, function(){
  console.log('listening on localhost:3000');
});

function getRandomColor(){
  var r = ~~(Math.random()*200);
  var g = ~~(Math.random()*200);
  var b = ~~(Math.random()*200);  
  return 'rgb('+r+','+g+','+b+')';
}