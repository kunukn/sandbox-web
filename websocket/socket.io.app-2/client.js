var box = document.getElementById('box');

function onMousemove(ev) {
  sendPosition({ x: ev.clientX, y: ev.clientY });
}
var milliSecondsThrottle = 17; // don't spam server
var mousemoveThrottled = _.throttle(onMousemove, milliSecondsThrottle);

window.addEventListener('mousemove', mousemoveThrottled);

var socket = io();

function sendPosition(position) {
  socket.emit('position', position);
}

socket.on('newConnection', function(data){
  box.style.backgroundColor = data.color;
});

socket.on('newPosition', function(position) {
  //console.log(position);
  box.style.transform = 'translateX('+position.x+'px) translateY('+position.y+'px)'
});
