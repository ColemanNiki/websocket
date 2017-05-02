var width = $('#video').width();
var height = $('#video').height();

function getElement(msg){
    var mod = $('<div></div>');
    mod.html(msg.content);
    mod.css({'position':'absolute','left':'40px'});
    $('#video').append(mod);
}