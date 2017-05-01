$(document).ready(function(){
    var height = $('.bg-img').width();
    $('.bg-img').css('height',height+'px');
});

function toRoom(roomId){
    location.href = 'room?id='+roomId;
}