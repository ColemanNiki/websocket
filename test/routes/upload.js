var express = require('express');
var multer = require('../tools/multerUtil');
var router = express.Router();
var upload = multer.single('file');

router.post('/logo',function(req,res,next){
    console.log("true");
    upload(req,res,function(err){
        if(err){
            console.log(err);
            res.json({success:0,message:600});
        }
        res.json({success:1,message:{logoUrl:'shenmegui'}});
    });
});

module.exports = router;