var multer = require('multer');
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,global.APP_PATH+'/public/upload');
    },
    filename:function(req,file,cb){
        console.log(file);
        var fileFormat = (file.originalname).split('.');
        cb(null,file.filename+'_'+Date.now()+"."+fileFormat[fileFormat.length-1]);
    }
});
var upload = multer({
    storage:storage
});

module.exports = upload;