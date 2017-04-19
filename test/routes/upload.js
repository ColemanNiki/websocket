var express = require('express');
var multer = require('../tools/multerUtil');
var router = express.Router();
var upload = multer.single('file');

router.post('/logo',function(req,res,next){
    console.log("true");
    // console.log(req.file);
    // req.file.originalname = Date.now()+"_"+req.file.originalname;
    // console.log(req.file.originalname);
    upload(req,res,function(err){
        if(err){
            console.log(err);
            res.json({success:0,message:600});
        }
        res.json({success:1,message:{logoUrl:req.file.filename}});
    });
});

module.exports = router;