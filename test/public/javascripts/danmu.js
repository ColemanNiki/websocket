function getElement(msg) {
    var video_width = $('#video').width();
    var video_height = $('#video').height();
    var mod = $('<span></span>');
    mod.html(msg.content);
    var top_fix = Math.random() * video_height;
    var speed = (Math.random() + 1) * 3000;
    mod.css({ 'position': 'absolute', 'left': video_width+'px', 'top': top_fix + 'px', 'color': msg.color, 'font-size': '25px' })
        .animate({left:'-200px'},speed,function(){
            $(this).remove();
        });
    $('#video').append(mod);
}