var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/getId',function(req,res){
  if(req.session.user)
    res.send(404);
  else{
    res.send(200,req.session.user.id);
  }
})
module.exports = router;
