var express = require('express');
var multer = require('../tools/multerUtil');
var router = express.Router();
var upload = multer.single('file');

router.post('/logo',upload,function(req,res){
    console.log(req.body.name);
    res.json("1");
});

module.exports = router;