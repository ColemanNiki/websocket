var express = require('express');
var router = express.Router();
var session = require('express-session');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/getId',function(req,res){
  if(!req.session.user)
    res.json({success:0,message:400});
  else{
    console.log("getId");
    var lives = global.dbHandel.getModel('lives');
    console.log(lives);    
    var name = req.session.user.name;
    console.log("start find-----------------------------------------------");
    lives.findOne({name:name,beused:false},function(err,doc){
      console.log("start find");
      if(err){
        res.json({success:0,message:501});
      }
      else{
        if(!doc){
          var live = new lives({
            name:name,
            beused:false
         });
          live.save(function(err,doc){
            if(err)
              res.json({success:0,message:501});
            else
              res.json({success:1,message:{name:name,key:doc._id}});
          });
        }
        else
          res.json({success:1,message:{name:doc.name,key:doc._id}});
      }
    });
  }
})
module.exports = router;
