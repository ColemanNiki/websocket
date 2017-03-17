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
});
module.exports = router;
