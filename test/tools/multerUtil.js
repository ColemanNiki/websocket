var multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,global.APP_PATH+'/public/upload');
    },
    filename:function(req,file,cb){
        var fileFormat = (file.originalname).split('.');
        cb(null,Date.now()+"_"+file.originalname);
    }
});
var upload = multer({
    storage:storage
});

module.exports = upload;