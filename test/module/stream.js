var express = require('express');
var url = require('url');
var stream = express();
stream.send = null;
stream.use(function(request,response){
  var arg =   url.parse(request.url,true).query;
  console.log(arg);
  if(arg.id == null || arg.key == null){
    console.log(
			'Failed Stream Connection: '+ request.socket.remoteAddress + ':' +
			request.socket.remotePort + ' - wrong secret.'
		);
		response.end();
  }
  else{
    var lives = global.dbHandel.getModel('lives');
    var liveTips = global.dbHandel.getModel('liveTips');
    lives.findOne({_id:arg.id,key:arg.key},function(err,doc){
      console.log("has value");
      if(err){
        response.send(404);
      }
      else{
        if(doc != null){
          console.log(doc);
          console.log("streamServer come");
          response.connection.setTimeout(0);
          doc.startTime = Date.now();
          lives.update({_id:arg.id},{state:1,startTime:Date.now()},function(error){});
          request.on('data',function(data){
            stream.send(data,arg.id);
          });
          request.on('close',function(){
            var liveTip = new liveTips({
              name:doc.name,
              createTime:doc.createTime,
              startTime:doc.startTime,
              endTime:Date.now(),
              liveTip:doc.liveTip,
              liveMsg:doc.liveMsg,
              livePortrait:doc.livePortrait,
              userId:doc.userId
            })
            liveTip.save(function(err){});
            lives.update({_id:arg.id},{state:0,startTime:null},function(err){
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
});

module.exports = stream;

