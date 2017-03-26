var express = require('express');
var url = require('url');
var stream = express();
stream.send = null;
stream.use(function(request,response){
  var arg =   url.parse(request.url,true).query;
  console.log(arg);
  if(arg.name == null || arg.key == null){
    console.log(
			'Failed Stream Connection: '+ request.socket.remoteAddress + ':' +
			request.socket.remotePort + ' - wrong secret.'
		);
		response.end();
  }
  else{
    var lives = global.dbHandel.getModel('lives');
    lives.findOne({name:arg.name,_id:arg.key,beused:false},function(err,doc){
      console.log("has value");
      if(err){
        response.send(404);
      }
      else{
        if(doc != null){
          console.log(doc);
          console.log("streamServer come");
          response.connection.setTimeout(0);
          doc.beused = true;
          lives.update({_id:arg.key},{beused:true},function(error){});
          request.on('data',function(data){
            stream.send(data);
          });
        }
      }
    })
  }
  // var params = request.url.substr(1).split('/');
	// if (params[0] !== 'secret') {
	// 	console.log(
	// 		'Failed Stream Connection: '+ request.socket.remoteAddress + ':' +
	// 		request.socket.remotePort + ' - wrong secret.'
	// 	);
	// 	response.end();
	// }
  // console.log("streamServer come");
  // response.connection.setTimeout(0);
  // request.on('data',function(data){
  //   stream.send(data);
  // });
});

module.exports = stream;

