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
    res.json({success:1,message:{id:req.session.user.id}});
  }
})
module.exports = router;
