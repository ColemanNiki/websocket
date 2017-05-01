/**
 * 图片预览方法
 */
function setImg() {
    var fileChance = $('#fileChance');
    fileChance.click();
}

function previewImage(fileId,imgId){
    var url;
    var file = document.getElementById(fileId);
    var agent = navigator.userAgent;
    if(agent.indexOf('MSIE')>=1){
        url = file.value;
    }
    else url = window.URL.createObjectURL(file.files[0]);
    document.getElementById(imgId).src = url;
    var width = document.getElementById(imgId).width;
    console.log(width);
    document.getElementById(imgId).style.height = width+8+'px';
}

//获得url中参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}