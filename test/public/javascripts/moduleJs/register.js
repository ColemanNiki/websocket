function setImg(){
    var fileChance = $('#fileChance');
    fileChance.click();
}

function register(){
    var username = $("#username").val();
    var password = $("#password").val();
    var checkPassword = $("#checkPassword").val();
    var email = $("#email").val();
    // if(username != "" && password != "" && checkPassword != "" && email != "" && password == checkPassword){
    //     var data = {
    //         username:username,
    //         password:password,
    //         email:email
    //     };
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
        // $("#registerForm")[0].onsubmit();
    // }
    var file = document.getElementById('fileChance');
    var formData = new FormData();
    formData.append('file',file.files[0]);
    $.ajax({
        url:'/upload/logo',
        type:'post',
        data:formData,
        cache:false,
        contentType:false,
        processData:false,
        success:function(data){
            console.log(data);
        },
        error:function(){
            console.log("chucuo");
        }
    })
}

function sendImg(){
    return true;
}