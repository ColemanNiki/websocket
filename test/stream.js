var express = require('express');
var stream = express();
stream.send = null;
stream.use(function(request,response){
    console.log(request.url);
    var params = request.url.substr(1).split('/');

	if (params[0] !== 'secret') {
		console.log(
			'Failed Stream Connection: '+ request.socket.remoteAddress + ':' +
			request.socket.remotePort + ' - wrong secret.'
		);
		response.end();
	}
  console.log("streamServer come");
  response.connection.setTimeout(0);
  request.on('data',function(data){
    stream.send(data);
  });
});

module.exports = stream;

