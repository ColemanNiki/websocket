var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var fs = require('fs');

router.get('/one',function(req,res,next){
    var form = new multiparty.Form({uploadDir:'./public/images/'});
    form.parse(req,function(err,fields,files){
        
    })
});
