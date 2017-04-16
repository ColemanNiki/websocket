var Schema = require('mongoose').Schema;
module.exports={
    users:{
        name:{type:String,required:true},
        pwd:{type:String,required:true},
        
    },
    liveTips:{
        name:{type:String,required:true},
        beused:{type:Boolean,required:true},
        startTime:{type:Date,required:false},
        endTime:{type:Date,required:false},
        liveTitle:{type:String,required:false},
        liveMsg:{type:String,required:false},
        livePortrait:{type:String,required:false}
    },
    lives:{
        name:{type:String,required:true},
        tipId:{type:Schema.Types.ObjectId,required:true},
        state:{type:Number,required:true}
    }
};