var Schema = require('mongoose').Schema;
module.exports={
    users:{
        name:{type:String,required:true},
        pwd:{type:String,required:true},
        email:{type:String,required:false},
        portraitUrl:{type:String,required:false},
        attentionNumber:{type:Number,require:true}
    },
    liveTips:{
        name:{type:String,required:true},
        createTime:{type:Date,required:true},
        startTime:{type:Date,required:true},
        endTime:{type:Date,required:true},
        liveTitle:{type:String,required:false},
        liveMsg:{type:String,required:false},
        livePortrait:{type:String,required:false},
        userId:{type:Schema.Types.ObjectId,required:true,ref:'users'},
    },
    lives:{
        name:{type:String,required:true},
        createTime:{type:Date,required:true},
        liveTitle:{type:String,required:false},
        liveMsg:{type:String,required:false},
        livePortrait:{type:String,required:false},
        userId:{type:Schema.Types.ObjectId,required:true,ref:'users'},
        key:{type:String,required:true},
        state:{type:Number,required:true},
        startTime:{type:Date,require:false}
    },
    attentions:{
        palyerId:{type:Schema.Types.ObjectId,require:true,ref:'users'},
        audienceId:{type:Schema.Types.ObjectId,require:true,ref:'users'},
        deleted:{type:Boolean,require:true}
    }
};