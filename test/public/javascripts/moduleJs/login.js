var username, password;
var localStorage = window.localStorage;

function load(){
    if(localStorage.getItem('username')){
        $("#username").val(localStorage.getItem('username'));
        $("#password").val(localStorage.getItem('password'));
    }
}

var toLogin = function () {
    username = $("#username").val();
    password = $("#password").val();
    var data = { "uname": username, "upwd": password };
    $.ajax({
        url: '/login',
        type: 'post',
        data: data,
        success: function (data, status) {
            if (status == 'success') {
                if (document.getElementById("remember").checked) {
                    localStorage.setItem('username',username);
                    localStorage.setItem('password',password);
                }
                // location.href = 'home';
            }
        },
        error: function (data, status) {
            if (status == 'error') {
                location.href = 'login';
            }
        }
    });
}