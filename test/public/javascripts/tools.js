/**
 * 图片预览方法
 */
function previewImage(fileId,imgId){
    var url;
    var file = document.getElementById(fileId);
    var agent = navigator.userAgent;
    if(agent.indexOf('MSIE')>=1){
        url = file.value;
    }
    else url = window.URL.createObjectURL(file.files[0]);
    document.getElementById(imgId).src = url;
}

