const io = require('socket.io')();

io.on('connection', (client) => {
	var refreshIntervalId = null;
	
	client.on('subscribeToTimer', (test_object) => {
		console.log('client is subscribing to timer with interval', test_object.interval, 'and timezone', test_object.offset);
		clearInterval(refreshIntervalId);
		
		refreshIntervalId = setInterval(() => {
			var d = new Date( new Date().getTime() + test_object.offset * 3600 * 1000).toUTCString().replace( / GMT$/, "" );
			client.emit('timer', d);
		}, test_object.interval);
	});
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);