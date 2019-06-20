(function ($, root) {
    function randerImg(src){
        var img = new Image();
        img.src = src;
        img.onload = function(){
            $('.img_box img').attr('src',src);
            root.blurImg(img,$('body'))
        }
    }
    function randerInfo(data){
        var str = '<div class = "song_name">'+ data.song +'</div>\
        <div class = "songer_name">'+ data.singer +'</div>\
        <div class = "ablum_name">'+ data.album +'</div>'
        $('.song_info').html(str)
    }
    function randerLike(like){
        if(like){
            $('.like').addClass('liking')
        }
    }
    // 暴露接口
    root.rander = function(data){
        randerImg(data.image);
        randerInfo(data);
        randerLike(data.isLike)
    }
}(window.Zepto, window.player || (window.player = {})))