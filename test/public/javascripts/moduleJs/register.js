function setImg(){
    var fileChance = $('#fileChance');
    fileChance.click();
}

function register(){
    var username = $("#username").val();
    var password = $("#password").val();
    var checkPassword = $("#checkPassword").val();
    var email = $("#email").val();
    if(username != "" && password != "" && checkPassword != "" && email != "" && password == checkPassword){
        var data = {
            username:username,
            password:password,
            email:email
        };
        // $('#imgForm').submit(function(e){
        //     alert("this");
        //     var data = new FormData($('#imgForm'));
        //     $.ajax({
        //         url:'/upload/portrait',
        //         type:'post',
        //         data: data,
        //         processData:false,
        //         contentType:false,
        //         success:function(data,status){
        //             console.log(data);
        //         }
        //     })
        // });
        $('#uploadImg').submit();
    }
}