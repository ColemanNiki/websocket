var express = require('express');
var session = require('express-session');
var url = require('url');
var http = require('http');
var https = require('https');
var tool = require('../tools/tool');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { user: req.session.user })
});
router.get('/index', function (req, res, next) {
  res.render('index', { user: req.session.user })
});
router.get('/logout', function (req, res, next) {
  req.session.user = null;
  res.render('index', { user: req.session.user })
});
router.get('/createRoom', function (req, res, next) {
  res.render('createRoom', { user: req.session.user });
});
router.get('/hall', function (req, res, next) {
  var lives = global.dbHandel.getModel('lives');
  lives.find({}, function (err, docs) {
    if (err)
      res.render('error');
    else {
      res.render('hall', { user: req.session.user, rooms: docs });
    }
  })
});
//关注列表
router.get('/attentionTable', function (req, res, next) {
  //获得关注列表
  var attentions = global.dbHandel.getModel("attentions");
  var users = global.dbHandel.getModel("users");
  var rooms = global.dbHandel.getModel('lives');
  //自动多表查询失败，大概是schame获取不规范，先用回调手动查询
  // attentions.find({audienceId:req.session.user.id,deleted:false}).populate('player','name email','users').exec(function(err,docs){
  //   if(err){
  //     console.log(err);
  //     res.json(err);
  //   }
  //   else{
  //     console.log("查询结果",docs);
  //     res.render('hall',{user:req.session.user,rooms:docs});
  //   }
  // });
  attentions.find({ audienceId: req.session.user.id, deleted: false }, function (err, docs) {
    if (err) res.render('error');
    else {
      tool.getAttentionTable(docs, function (docs) {
        console.log("get result", docs);
        res.render('hall', { user: req.session.user, rooms: docs });
      });
    }
  })
});

router.get('/room', function (req, res, next) {
  var arg = url.parse(req.url, true).query;
  if (arg.id != null) {
    var wsUrl;
    if (global.isSSL) wsUrl = 'wss://';
    else wsUrl = 'ws://';
    wsUrl += "colemanniki.cn" + ':8100/show?id=' + arg.id;
    var lives = global.dbHandel.getModel('lives');
    var users = global.dbHandel.getModel('users');
    lives.findOne({ _id: arg.id }, function (err, live) {
      if (err || live == null) {
        res.render('error');
      }
      else {
        console.log("find lives:", live);
        users.findOne({ _id: live.userId }, function (err, doc) {
          if (err || doc == null) res.render('error');
          tool.isAttention(live.userId, req.session.user, function (isAttention) {
            console.log("find lives-user:", doc);
            res.render('room', { wsUrl: wsUrl, live: live.livePortrait, player: doc, user: req.session.user, attention: isAttention });
          });
        })
      }
    })
  }
  else
    res.render('error');
});

router.get('/toMe', function (req, res, next) {
  res.render('toMe', { title: 'Express' });
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'login' });
}).post('/login', function (req, res) {
  var User = global.dbHandel.getModel('users');
  var uname = req.body.uname;
  var upwd = req.body.upwd;
  User.findOne({ name: uname }, function (err, doc) {
    if (err) {
      res.send(500);
    } else if (!doc) {
      res.send(404);
    }
    else {
      if (upwd == doc.pwd) {
        req.session.user = new Object({
          name: uname,
          id: doc._id,
          portraitUrl: doc.portraitUrl,
          sign: true
        });
        res.send(200);
      }
      else {
        res.send(404);
      }
    }
  })
});

// 搜索功能
router.post('/find', function (req, res) {
  var formData = req.body.key;
  var lives = global.dbHandel.getModel('lives');
  var reg = new RegExp(formData, 'i');
  lives.find({
    $or: [
      { name: { $regex: reg } },
      { liveTitle: { $regex: reg } },
    ],
    'state': { '$lt': 3 }
  }, function (err, docs) {
      if (err) {
        console.log(err);
        res.render('error');
      }
      console.log(docs);
      res.render('hall', { user: req.session.user, rooms: docs });
    })
})
router.get('/register', function (req, res, next) {
  res.render('register', { title: 'register' });
});

router.get('/home', function (req, res, next) {
  res.render('home', { title: 'Web Live' });
});

router.get('/outlogin', function (req, res, next) {
  req.session.user = null;
  res.render('index', { title: 'index' });
});
module.exports = router;
