var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/show', function(req, res, next) {
  res.render('show', { title: 'Express' });
});
router.get('/toMe', function(req, res, next) {
  res.render('toMe', { title: 'Express' });
});
router.get('/login',function(req,res,next){
  res.render('login',{title:'login'});
});
router.get('/register',function(req,res,next){
  res.render('register',{title:'register'});
}).post('/register',function(req,res){
  console.log("start post");
  var User = global.dbHandel.getModel('user');
  var uname = req.body.name;
  var upwd = req.body.upwd;
  User.findOne({name:uname},function(err,doc){
    if(err){
      res.send(500);
      console.log(err);
    }else if(doc){
      res.send(500);
      console.log("存在用户");
    }else{
      User.create({
        name:uname,
        pwd:upwd
      },function(err,doc){
        if(err){
          res.send(500);
          console.log("添加错误");
        }else{
          res.send(200);
        }
      });
    }
  })
});
module.exports = router;
