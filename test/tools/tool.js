var events = require('events');


module.exports = {
    create_random_string: function (index) {
        var len = index || 10;
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = chars.length;
        var pwd = '';
        for (i = 0; i < len; i++) {
            pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    isAttention: function (palyerId, audience, callback) {
        if (audience == undefined) {
            callback(false);
        }
        else {
            var audienceId = audience.id;
            var attentions = global.dbHandel.getModel('attentions');
            attentions.findOne({ palyerId: palyerId, audienceId: audienceId, deleted: false }, function (err, doc) {
                if (err || !doc) {
                    callback(false);
                }
                else {
                    callback(true);
                }
            })
        }
    },
    getAttentionTable: function (attentionList,callback) {
        var lives = global.dbHandel.getModel('lives');
        var result = [];
        var j = 0; //同步标志
        var obj = null;
        var eventEmitter = new events.EventEmitter();
        eventEmitter.on('next', addResult); //监听事件
        function addResult(){
            if(obj!=null && obj != undefined){
                result.push(obj);
            }
            j++;
            if(j == attentionList.length){
                callback(result);
            }
        }
        for(var i=0; i<attentionList.length; i++){
            lives.findOne({userId:attentionList[i].palyerId},function(err,doc){
                if(err){
                    obj = null;
                    eventEmitter.emit('next');
                }
                else{
                    obj = doc;
                    eventEmitter.emit('next');
                }
            })
        }
    },
}
