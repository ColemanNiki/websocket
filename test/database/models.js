var Schema = require('mongoose').Schema;
module.exports={
    users:{
        name:{type:String,required:true},
        pwd:{type:String,required:true},
        email:{type:String,reqired:false},
        portraitUrl:{type:String,reqired:false}
    },
    liveTips:{
        name:{type:String,required:true},
        createTime:{type:Date,required:true},
        startTime:{type:Date,required:true},
        endTime:{type:Date,required:true},
        liveTitle:{type:String,required:false},
        liveMsg:{type:String,required:false},
        livePortrait:{type:String,required:false},
        userId:{type:Schema.Types.ObjectId,required:true},
        roomId:{type:Schema.Types.ObjectId,reqired:true}
    },
    lives:{
        name:{type:String,required:true},
        createTime:{type:Date,required:true},
        liveTitle:{type:String,required:false},
        liveMsg:{type:String,required:false},
        livePortrait:{type:String,required:false},
        userId:{type:Schema.Types.ObjectId,required:true},
        key:{type:String,required:true},
        beused:{type:Boolean,required:true}
    }
};