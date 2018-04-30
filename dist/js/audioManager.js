(function($,root){
    function audioManager() {
        this.audio = new Audio();
        this.status = "pause";
    }
    audioManager.prototype = {
        play : function() {
            this.audio.play();
            this.status = "play"
        },
        pause : function() {
            this.audio.pause();
            this.status = "pause"
        },
        changeSourse : function(src) {
            this.audio.src = src;
            this.audio.load();
        },
        jumpToPlay : function(time) {
            this.audio.currentTime = time;
            this.audio.play();
        }
    }
    root.audioManager = audioManager;
}(window.Zepto,window.player))