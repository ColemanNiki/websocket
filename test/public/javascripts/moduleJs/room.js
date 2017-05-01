var goEasy = new GoEasy({
    appkey: 'BC-986da6119c6b446c9ee9fda530452e90'
});

var channelName = GetQueryString("id");

function sendMsg() {
    var msg = $('#msgInput').val();
    goEasy.publish({
        channel: channelName,
        message: msg
    });
    
}

goEasy.subscribe({
    channel: channelName,
    onMessage: function (message) {
        console.log(message.content);
    }
});