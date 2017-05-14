

module.exports = {
    create_random_string : function (index) {
        var len = index || 10;
        　　var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        　　var maxPos = chars.length;
        　　var pwd = '';
        　　for (i = 0; i < len; i++) {
            　　　　pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        　　}
        　　return pwd;
    },
    isAttention : function(palyerId,audienceId,callback){
        var attentions = global.dbHandel.getModel('attentions');
        attentions.findOne({palyerId:palyerId,audienceId:audienceId,deleted:false},function(err,doc){
            if(err || !doc){
                callback(false);
            }
            else{
                callback(true);
            }
        })
    }
}