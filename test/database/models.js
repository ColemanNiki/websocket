module.exports={
    users:{
        name:{type:String,required:true},
        pwd:{type:String,required:true}
    },
    lives:{
        name:{type:String,required:true},
        beused:{type:Boolean,required:true},
        startTime:{type:Date,required:false},
        endTime:{type:Date,required:false},
    }
};