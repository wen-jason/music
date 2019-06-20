var dataList;
var len;
var root = window.player;
var rander = root.rander;
var audioM = root.AudioManager;
var pro;
var index;
var timer;
// 发送ajax请求拿数据
function getData(url) {
    $.ajax({
        type: 'GET',
        url: url,
        success: function (data) {
            dataList = data;
            len = data.length;
            index = new root.index(len);
            rander(data[0]);
            audioM.getAudio(data[0].audio);
            pro = new root.pro(audioM.audio)
            $('.img_box').data('deg', 0);
            bindTouch();
            bindEvent();
            randerlist(data);
        },
        error: function () {
            alert('error')
        }
    })
}
function randerlist(data){
    data.forEach(function(item){
        var $list = $('<li class="list_item">' + item.song + '-' + item.singer + '-' + item.album + '</li>');
        $('.song_list ul').append($list)
    })
}

function bindTouch() {
    var bottom = $('.bottom').offset();
    var l = bottom.left;
    var w = bottom.width;
    var curtime;
    $('.spot').on('touchstart', function (e) {
        pro.proPause();
        audioM.pause();
    }).on('touchmove', function (e) {
        var x = e.changedTouches[0].clientX;
        var per = (x - l) / w * 100;
        if (per >= 0 && per <= 100) {
            $('.top').css({
                transform: 'translateX(' + (per - 100) + '%)'
            })
            curtime = per * pro.allTime / 100;
            pro.randerCurtime(curtime);
            pro.dateCurtime(curtime);
        }

    }).on('touchend', function (e) {
        pro.interval();
        audioM.play();
        $('.play').addClass('pause');
    })
}

function bindEvent() {
    $('body').on('play_c', function (e, i) {
        rander(dataList[i]);
        audioM.getAudio(dataList[i].audio);
        if (audioM.status == 'play') {
            audioM.play();
            pro.interval();
            $('.img_box').data('deg', 0);
            $('.img_box').css({
                transform: 'rotateZ(0deg)',
                transition: ''
            })
            var deg = $('.img_box').data('deg');
            rotate(deg)
        }
    })
    $('.prev').on('click', function () {
        var i = index.prev();
        $('body').trigger('play_c', i);
    })
    $('.next').on('click', function () {
        var i = index.next();
        $('body').trigger('play_c', i);
    })
    $('.play').on('click', function () {
        if (audioM.status == 'pause') {
            audioM.play();
            pro.interval();
            var deg = $('.img_box').data('deg');
            rotate(deg);
            $(this).addClass('pause');
        } else {
            audioM.pause();
            pro.proPause();
            clearInterval(timer);
            $(this).removeClass('pause');
        }
    })
    $('.list').on('click', function () {
        $('.song_list').show();
    })
    $('.close').on('click',function(){
        $('.song_list').hide();
    })
    $('.song_list ul').on('click','li',function(){
        var i = $(this).index();
        $('body').trigger('play_c', i);
        $('.song_list').hide()
    })
}
// 旋转img_box
function rotate(deg) {
    clearInterval(timer);
    deg = +deg;
    timer = setInterval(function () {
        deg += 2;
        $('.img_box').css({
            transform: 'rotateZ(' + deg + 'deg)',
        })
        $('.img_box').data('deg', deg)
    }, 100)
}
getData('../mock/data.json');