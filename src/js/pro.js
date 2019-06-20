(function ($, root) {
    function Pro(audio) {
        this.getAudio(audio);
        this.curtime = 0;
        this.timer = null;
    }
    Pro.prototype = {
        // 初始化拿到当前播放的音频
        getAudio: function (audio) {
            var self = this;
            audio.onloadeddata = function () {
                self.audio = audio;
                self.allTime = parseInt(self.audio.duration);
                self.curtime = self.audio.currentTime;
                self.randerCurtime();
                self.proUpdate();
                self.randerAllTime();
            };
        },
        // 渲染总的时间
        randerAllTime: function () {
            var allTime = this.dealTime(this.allTime);
            $('.all_time').text(allTime)
        },
        // 将秒-->04:00
        dealTime: function (t) {
            var m = '0' + Math.floor(t / 60);
            var s = '0' + t % 60;
            return m.slice(-2) + ':' + s.slice(-2)
        },
        // 渲染当前播放时间
        randerCurtime: function (curTime) {
            var curTime = Math.round(curTime || this.curtime);
            curTime = this.dealTime(curTime);
            $('.cur_time').text(curTime);
        },
        // 不断地更新进度条
        interval: function () {
            var self = this;
            clearInterval(this.timer);
            this.timer = setInterval(function () {
                self.proUpdate();
                self.randerCurtime();
                if (self.per >= 1) {
                    clearInterval(self.timer);
                    $('.prev').trigger('click');
                }
            }, 500)
        },
        // 进度条更新
        proUpdate: function () {
            this.curtime = this.audio.currentTime;
            this.per = this.curtime / this.allTime;
            var per = (this.per - 1) * 100;
            $('.pro .top').css({
                transform: 'translateX(' + per + '%)'
            })
        },
        // 停止
        proPause: function () {
            clearInterval(this.timer);
        },
        // 拖拽时更新当前播放时间
        dateCurtime: function (curTime) {
            this.audio.currentTime = curTime
        }
    }
    root.pro = Pro;
}(window.Zepto, window.player || (window.player = {})))