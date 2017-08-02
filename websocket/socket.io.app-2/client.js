var box = document.getElementById('box');
window.addEventListener('mousemove', _.throttle(onMousemove), 100);

function onMousemove(ev) {
  sendPosition({ x: ev.clientX, y: ev.clientY });
}

var socket = io();

function sendPosition(position) {
  socket.emit('position', position);
}

socket.on('newPosition', function(position) {
  //console.log(position);
  box.style.left = position.x + 'px';
  box.style.top = position.y + 'px';
});
