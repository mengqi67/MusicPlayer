(function ($, root) {
    var $scope = $(document.body),
     curDuration,
     frameId,
     lastPercent = 0,
     startTime,
     curTime;

    function start(a) {
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame() {
            curTime = new Date().getTime();
           var percent =a + lastPercent + (curTime - startTime) / (curDuration * 1000);
           if (percent < 1) {
               frameId = requestAnimationFrame(frame);
               upDate(percent);
           } else { 
               cancelAnimationFrame(frameId); 
           }
       }
        frame();
    }
    
    function stop() {
        var lastTime = new Date().getTime() ;
        lastPercent =lastPercent + (lastTime - startTime)/(curDuration * 1000)
        cancelAnimationFrame(frameId);
    }
    function renderPro (percent) {
        var percentage = (percent - 1) * 100 + "%";
        $scope.find(".pro-top").css({
            transform: "translateX("+percentage+")"
        })
    }
    function upDate(percent) {
        var currentTime = curDuration * percent;
        var time = formateDate(currentTime);
        $scope.find(".cur-time").html(time);
        renderPro(percent);
    }
    function formateDate(duration) {
        var minute = Math.floor(duration / 60);
        var second = Math.floor(duration - minute * 60);
        if (minute < 10) {
            minute = "0" + minute;
        }
        if (second < 10) {
            second = "0" + second;
        }
        return minute + ":" + second;
    }
    function renderAllTime(duration) {
        curDuration = duration;
        lastPercent = 0;
        var allTime = formateDate(duration);
        $scope.find(".all-time").html(allTime);
    }
    root.proccess = {
        renderAllTime: renderAllTime,
        start: start,
        stop : stop,
        upDate : upDate,
        // frame : frame
    }
}(window.Zepto, window.player))