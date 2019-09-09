import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function subscribeToTimer(offset, cb) {
	socket.on('timer', timestamp => cb(null, timestamp));
	socket.emit('subscribeToTimer', { offset: offset, interval: 1000 });
}

export { subscribeToTimer }