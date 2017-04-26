$(document).ready(function () {
    console.log("fsdfsd");
    $.ajax({
        url: 'users/get_my_room',
        type: 'GET',
        success: function (data) {
            if (data.success == 1) {
                if (data.message) {
                    if (data.message.livePortrait) {
                        $("#portrait").attr('src', 'upload/' + data.message.livePortrait);
                    }
                    $("#room_name").val(data.message.name);
                    $("#room_title").val(data.message.liveTitle);
                    $("#room_message").val(data.message.liveMsg);
                    if (data.message.beused) {
                        $("#create_button").addClass('disabled').attr('disabled', true).html("正在直播");
                    }
                    else {
                        $("#create_button").html("修改房间");
                    }
                }
                else{
                    $("#key_button").addClass('disabled').attr('disabled',true);
                }
            }
            else {
                alert(msgTip[425]);
            }
        },
        error: function (data) {
            console.log(data);
        }
    })
});

function create_room() {
    var room_name = $("#room_name").val();
    var room_title = $("#room_title").val();
    var room_message = $("#room_message").val();
    var file = document.getElementById("fileChance");
    if (room_name != "") {
        var data = {
            room_name: room_name,
            room_title: room_title,
            room_message: room_message
        };
        var formData = new FormData();
        if (file.files[0]) {
            formData.append('file', file.files[0]);
        }
        data = JSON.stringify(data);
        formData.append('data', data);
        $.ajax({
            url:'users/create_room',
            type:'POST',
            data:formData,
            cache: false,
            contentType: false,
            processData: false,
            success:function(data){
                if(data.success == 1){
                    alert("您的直播地址为： "+data.message.sendUrl+"/n"+"请复制保存");
                }
                else{
                    alert(msgTip[data.message]);
                }
            },
            error:function(data){
                console.log(data);
            }
        })
    }
}