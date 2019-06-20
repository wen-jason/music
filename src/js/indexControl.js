(function($,root){
    function Index(len){
        this.index = 0;
        this.len = len;
    }
    Index.prototype = {
        prev:function(){
            return this.getIndex(-1);
        },
        next:function(){
            return this.getIndex(1);
        },
        getIndex:function(n){
            return this.index = ((this.index + this.len + n) % this.len);
        }
    }

    root.index = Index;
}(window.Zepto,window.player || (window.play = {})))