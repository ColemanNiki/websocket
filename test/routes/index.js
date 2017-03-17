var express = require('express');
var session = require('express-session');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.user && req.session.user.sign){
    res.render('home',{title:req.session.user});
  }else{
    res.render('index', { title: 'Express' });
  }
});

router.get('/show', function(req, res, next) {
  res.render('show', { title: 'Express' });
});

router.get('/toMe', function(req, res, next) {
  res.render('toMe', { title: 'Express' });
});

router.get('/login',function(req,res,next){
  res.render('login',{title:'login'});
}).post('/login',function(req,res){
  var User = global.dbHandel.getModel('users');
  var uname = req.body.uname;
  var upwd = req.body.upwd;
  console.log(uname+" "+upwd);
  User.findOne({name:uname},function(err,doc){
    if(err){
      res.send(500);
      console.log(err);
    }else if(!doc){
      console.log("1");
      res.send(404);
    }
    else{
      if(upwd == doc.pwd){
        req.session.user = {
          name = uname,
          id = doc._id,
          sing = true
        };
        res.send(200);
      }
      else{
        console.log(doc.pwd);
        res.send(404);
      }
    }
  })
});

router.get('/register',function(req,res,next){
  res.render('register',{title:'register'});
}).post('/register',function(req,res){
  var User = global.dbHandel.getModel('users');
  var uname = req.body.uname;
  var upwd = req.body.upwd;
  User.findOne({name:uname},function(err,doc){
    if(err){
      res.send(500);
      console.log(err);
    }else if(doc){
      res.send(500);
      console.log("存在用户");
    }else{
      var nUser = new User({
        name:uname,
        pwd:upwd
      });
      nUser.save(function(err){
        if(err){
          res.send(500);
          console.log("添加错误");
        }else{
          console.log("添加成功");
          res.send(200);
        }
      })
    }
  })
});

router.get('/home',function(req,res,next){
  res.render('home',{title:'Web Live'});
});
module.exports = router;
