var express = require('express');
var router = express.Router();
var session = require('express-session');
var multer = require('../tools/multerUtil');
var upload = multer.single('file');
var events = require('events');
var tool = require('../tools/tool');
var moment = require('moment');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.get('/get_my_room', function (req, res, next) {
  var lives = global.dbHandel.getModel('lives');
  lives.findOne({ userId: req.session.user.id }, function (err, doc) {
    if (err) {
      res.json({ success: 0, message: 425 })
    } else if (doc) {
      res.json({ success: 1, message: doc });
    }
    else {
      res.json({ success: 1, message: null });
    }
  })
});
router.post('/create_room', upload, function (req, res, next) {
  var sendUrl = "http://www.colemanniki.cn:8081/send?";
  var data = JSON.parse(req.body.data);
  var lives = global.dbHandel.getModel('lives');
  lives.findOne({ userId: req.session.user.id }, function (err, doc) {
    if (doc) {
      var key = tool.create_random_string(8);
      doc.liveTitle = data.room_title;
      doc.liveMsg = data.room_message;
      doc.createTime = Date.now();
      doc.key = key;
      if (req.file) {
        doc.livePortrait = req.file.filename;
      }
      doc.save(function (err, doc) {
        if (err) {
          console.log(err);
          res.json({ success: 0, message: 421 });
        }
        else {
          res.json({ success: 1, message: { sendUrl: sendUrl + "id=" + doc._id + "&key=" + key } });
        }
      })
    }
    else {
      var key = tool.create_random_string(8);
      var live = new lives({
        name: req.session.user.name,
        liveTitle: data.room_title,
        liveMsg: data.room_message,
        createTime: Date.now(),
        state: 0,
        userId: req.session.user.id,
        key: key
      });
      if (req.file) {
        live.livePortrait = req.file.filename;
      }
      live.save(function (err, doc) {
        if (err) {
          console.log(err);
          res.json({ success: 0, message: 421 });
        }
        else {
          res.json({ success: 1, message: { sendUrl: sendUrl + "id=" + doc._id + "&key=" + key } });
        }
      })
    }
  });
})

router.get('/get_room_key', function (req, res, next) {
  var sendUrl = "http://www.colemanniki.cn:8081/send?";
  var lives = global.dbHandel.getModel('lives');
  lives.findOne({ userId: req.session.user.id }, function (err, doc) {
    if (err) {
      res.json({ success: 0, message: 424 });
    }
    else {
      res.json({ success: 1, message: { sendUrl: sendUrl + "id=" + doc._id + "&key=" + doc.key } });
    }
  })
})
router.get('/getLiveRoomList', function (req, res, next) {
  var lives = global.dbHandel.getModel('lives');
  lives.find({}, function (err, docs) {
    if (err)
      res.json({ success: 0, message: 424 });
    else {
      res.json({ success: 1, message: docs });
    }
  })
});
router.post('/register', upload, function (req, res) {
  var data = JSON.parse(req.body.data);
  var User = global.dbHandel.getModel('users');
  var uname = data.name;
  var upwd = data.pwd;
  var email = data.email;
  console.log("pwd:", upwd);
  User.findOne({ name: uname }, function (err, doc) {
    if (err) {
      res.send(500);
    } else if (doc) {
      res.send(500);
      console.log("存在用户");
    } else {
      var nUser = new User({
        name: uname,
        pwd: upwd,
        email: email
      });
      if (req.file) {
        nUser.portraitUrl = req.file.filename;
      }
      nUser.save(function (err, doc) {
        if (err) {
          console.log(nUser);
          res.send(500);
          console.log(err);
        } else {
          console.log("添加成功");
          res.json({ success: 1, message: { userId: doc._id } });
        }
      })
    }
  })
});

router.post('/attention', function (req, res, next) {
  var data = req.body.attentionId;
  console.log(req.body);
  var attentions = global.dbHandel.getModel('attentions');
  console.log("getmodel success:" + data);
  attentions.findOne({ palyerId: data, audienceId: req.session.user.id }, function (err, doc) {
    if (err) {
      res.json({ success: 0, message: 501 });
    }
    else {
      if (doc) {
        var judge = !doc.deleted;
        attentions.update({ _id: doc._id }, { deleted: judge }, function (err, doc) {
          if (err) {
            res.json({ success: 0, message: 501 });
          }
          else {
            res.json({ success: 1, message: doc });
          }
        })
      }
      else {
        var attention = new attentions({
          palyerId: data,
          audienceId: req.session.user.id,
          deleted: false
        });
        console.log(attention);
        attention.save(function (err, doc) {
          if (err) {
            res.json({ success: 0, message: 450 });
          }
          else {
            res.json({ success: 1, message: doc });
          }
        })
      }
    }
  })
});


router.post('/getId', function (req, res) {
  var sendUrl;
  if (global.isSSL)
    sendUrl = "https://www.colemanniki.cn:8081/send?";
  else
    sendUrl = "http://localhost:8081/send?";
  if (!req.session.user)
    res.json({ success: 0, message: 400 });
  else {
    var lives = global.dbHandel.getModel('lives');
    var liveTips = global.dbHandel.getModel('liveTips');
    var name = req.session.user.name;
    lives.findOne({ name: name, state: 1 }, function (err, doc) {
      if (err) {
        res.json({ success: 0, message: 501 });
      }
      else {
        if (doc) {
          res.json({ success: 0, message: 423 });
        }
        else {
          lives.findOne({ name: name, state: 0 }, function (err, doc) {
            if (err) {
              res.json({ success: 0, message: 501 });
            }
            else {
              if (!doc) {
                var liveTip = new liveTips({
                  name: name,
                  beused: false,
                  liveTitle: req.body.liveTitle || "",
                  liveMsg: req.body.liveMsg || "",
                  livePortrait: req.body.livePortrait || ""
                });
                liveTip.save(function (err, doc) {
                  if (err) res.json({ success: 0, message: 420 });
                  else {
                    var live = new lives({
                      name: name,
                      tipId: doc._id,
                      state: 0
                    });
                    live.save(function (err, doc) {
                      if (err) res.json({ success: 0, message: 421 });
                      else {
                        res.json({ success: 1, message: { sendUrl: sendUrl + "name=" + name + "&key=" + doc._id } });
                      }
                    })
                  }
                })
              }
              else {
                var tempId = doc._id;
                liveTips.findById(doc.tipId, function (err, doc) {
                  if (err) {
                    res.json({ success: 0, message: 422 });
                  }
                  else {
                    doc.liveTitle = req.body.liveTitle || "";
                    doc.liveMsg = req.body.liveMsg || "";
                    doc.livePortrait = req.body.livePortrait || "";
                    doc.save(function (err) {
                      if (err) res.json({ success: 0, message: 422 });
                      else res.json({ success: 1, message: { sendUrl: sendUrl + "name=" + name + "&key=" + tempId } });
                    });
                  }
                })
              }
            }
          });
        }
      }
    })
  }
});

router.get('/history', function (req, res, next) {
  var livetips = global.dbHandel.getModel('liveTips');
  livetips.find({ userId: req.session.user.id }, function (err, docs) {
    if (err) res.render('error');
    else {
      docs.forEach(function (item, index) {
        var difftemp =moment(docs[index].endTime).diff(docs[index].startTime)/1000;
        docs[index].stillTime =Math.floor(difftemp/60) +"分"+Math.floor(difftemp%60)+"秒" ;
      });
      res.render('history', { message: docs,user: req.session.user});
    }
  })
});
module.exports = router;
