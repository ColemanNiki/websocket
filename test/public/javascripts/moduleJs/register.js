function setImg() {
    var fileChance = $('#fileChance');
    fileChance.click();
}

function register() {
    var username = $("#username").val();
    var password = $("#password").val();
    var checkPassword = $("#checkPassword").val();
    var email = $("#email").val();
    var file = document.getElementById('fileChance');
    if (username != "" && password != "" && checkPassword != "" && email != "" && password == checkPassword) {
        var data = {
            name:username,
            pwd: password,
            email:email
        }
        var formData = new FormData();
        if(file.files[0]){
            formData.append('file',file.files[0]);
        }
        data = JSON.stringify(data);
        formData.append('name',name);
        formData.append('data',data);
        $.ajax({
            url: '/users/register',
            type: 'post',
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if(data.success = 1){
                    console.log(data);
                }
            },
            error: function (res) {
                console.log(res);
            },
            crossDomain: true
        })
    }
}
