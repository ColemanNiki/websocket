var express = require('express');
var router = express.Router();
var session = require('express-session');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/getId',function(req,res){
  var sendUrl;
  if(global.isSSL)
    sendUrl = "https://www.colemanniki.cn:8081/send?";
  else
    sendUrl = "http://localhost:8081/send?";
  if(!req.session.user)
    res.json({success:0,message:400});
  else{
    console.log("getId");
    var lives = global.dbHandel.getModel('lives');   
    var liveTips = global.dbHandel.getModel('liveTips');
    var name = req.session.user.name;
    console.log("start find-----------------------------------------------");
    lives.findOne({name:name,state:1},function(err,doc){
      if(err){
        res.json({success:0,message:501});
      }
      else{
        if(doc){
          res.json({success:0,message:423});
        }
        else{
          lives.findOne({name:name,state:0},function(err,doc){
      console.log("start find");
      if(err){
        res.json({success:0,message:501});
      }
      else{
        if(!doc){
          var liveTip = new liveTips({
            name:name,
            beused:false,
            liveTitle:req.body.liveTitle || "",
            liveMsg:req.body.liveMsg || "",
            livePortrait:req.body.livePortrait || ""
         });
         liveTip.save(function(err,doc){
            if(err)  res.json({success:0,message:420});
            else{
              var live = new lives({
                name:name,
                tipId:doc._id,
                state:0
              });
              live.save(function(err,doc){
                if(err) res.json({success:0,message:421});
                else{
                  res.json({success:1,message:{sendUrl:sendUrl+"name="+name+"&key="+doc._id}});
                }
              })
            }
          })
        //   live.save(function(err,doc){
        //     if(err)
        //       res.json({success:0,message:501});
        //     else
        //       res.json({success:1,message:{name:name,key:doc._id}});
        //   });
        // }
        // else
        //   res.json({success:1,message:{name:doc.name,key:doc._id}});
          }
      else{
        var tempId = doc._id;
        liveTips.findById(doc.tipId,function(err,doc){
          if(err){
            res.json({success:0,message:422});
          }
          else{
            doc.liveTitle = req.body.liveTitle || "";
            doc.liveMsg = req.body.liveMsg || "";
            doc.livePortrait = req.body.livePortrait || "";
            doc.save(function(err){
              if(err) res.json({success:0,message:422});
              else res.json({success:1,message:{sendUrl:sendUrl+"name="+name+"&key="+tempId}});
            });
          }
        })

      } 
    }});
        }
      }
    })
    
  }
})
module.exports = router;
