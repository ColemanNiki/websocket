$(document).ready(function () {
    var video_width = $('#video').width();
    var video_height = $('#video').height();
    $("#color_select").spectrum({
        preferredFormat: "hex3",
        showInput: true,
        showPalette: true,
        palette: [["red", "rgba(0, 255, 0, .5)", "rgb(0, 0, 255)"]]
    });
})

function attention(attention){
    var data = new object();
    data.attentionId = attentionId;
     $.ajax({
            url: '/users/attention',
            type: 'post',
            data: data,
            success: function (data) {
                if(data.success = 1 ){
                    console.log(data);
                }
            },
            error: function (res) {
                console.log(res);
            },
            crossDomain: true
        })
}

var goEasy = new GoEasy({
    appkey: 'BC-986da6119c6b446c9ee9fda530452e90'
});

var channelName = GetQueryString("id");

function sendMsg() {
    var msg = new Object();
    msg.content = $('#msgInput').val();
    msg.color = $("#color_select").spectrum("get").toHexString();
    msg = JSON.stringify(msg);
    goEasy.publish({
        channel: channelName,
        message: msg
    });
}

goEasy.subscribe({
    channel: channelName,
    onMessage: function (message) {
        var msg = JSON.parse(message.content);
        getElement(msg);
    }
});
