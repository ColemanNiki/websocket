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
    var liveTips = global.dbHandel.getModel('liveTips');
    lives.findOne({name:arg.name,_id:arg.key,state:0},function(err,doc){
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
          lives.update({_id:arg.key},{state:1},function(error){});
          liveTips.update({_id:doc.tipId},{beused:true,startTime:Date.now()},function(err){});
          request.on('data',function(data){
            stream.send(data);
          });
          request.on('close',function(){
            liveTips.update({_id:doc.tipId},{endTime:Date.now()},function(err){});
            lives.remove({_id:arg.key},function(err){
              console.log('删除');
            });
            console.log("链接已经断开了");
            response.send(404);
          })
        }
        else{
          console.log("该直播间已经过期啦");
          response.send(404);
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

