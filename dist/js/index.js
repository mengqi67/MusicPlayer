var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var songList;
var controlmanager;
var audiomanager = new root.audioManager();
var proccessor = root.proccess;
var timess = 0;

function bindTouch() {
    var $sliderPoint = $scope.find(".slider-point");
    var offset = $scope.find(".pro-wrapper").offset();
    var left = offset.left;
    var width = offset.width;
    // console.log(offset);
    $sliderPoint.on("touchstart",function () {
        proccessor.stop();
    }).on("touchmove", function(e) {
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        // console.log(percent)
        if(percent > 1) {
            percent = 1;
        }
        if(percent < 0) {
            percent = 0;
        }
        proccessor.upDate(percent);
    }).on("touchend",function (e) {
        var x = e.changedTouches[0].clientX;
        var percent = (x - left) / width;
        console.log(percent);
        if(percent > 1) {
            percent = 1;
        }
        if(percent < 0) {
            percent = 0;
        }
        var index = controlmanager.index;
        var curDuration = songList[index].duration;
        var curTime = curDuration * percent;
        audiomanager.jumpToPlay(curTime);
        $scope.find(".stop-btn").addClass("playing");
        audiomanager.status = "play";
        proccessor.upDate(percent);
        proccessor.stop();
        
        
    })
}
function bindClick() {
    $scope.find(".stop-btn").on("click",function() {
        if(audiomanager.status == "pause") {
            audiomanager.play();
            proccessor.start();
            $(this).addClass("playing");
            console.log("pause")
        }else {
            audiomanager.pause();
            $(this).removeClass("playing");
            proccessor.stop();
            console.log("play")
        }
    })
    $scope.find(".next-btn").on("click",function() {
        // if(index == songList.length -1) {
        //     index = 0;
        // } else{
        //     index++;
        // }
        // root.render(songList[index]);
        var index = controlmanager.next();
        $scope.trigger("player:change",index)
    })
    $scope.find(".prev-btn").on("click",function() {
        // if(index == 0) {
        //     index = songList.length -1;
        // } else{
        //     index--;
        // }
        // root.render(songList[index]);
        var index = controlmanager.prve();        
        $scope.trigger("player:change",index)
        
    })
}
$scope.on("player:change",function(event,index) {
    root.render(songList[index])
    audiomanager.changeSourse(songList[index].audio);
    if(audiomanager.status == "play") {
        proccessor.start();
        audiomanager.play();
    }
    proccessor.renderAllTime(songList[index].duration);
    proccessor.upDate(0);
})

function getData(url) {
    $.ajax({
        type : "GET",
        url : url,
        success : successFn
    })
}
function successFn(data) {
    songList = data;
    $scope.trigger("player:change",0);
    bindClick();
    bindTouch();
    controlmanager = new root.controlManager(data.length);
}
getData("/mock/data.json")