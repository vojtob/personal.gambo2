function timeToSec(timeString) {
    var parts = timeString.split(":");
    var hour = parseInt(parts[0]);
    var min = parseInt(parts[1]);
    var sec = parseInt(parts[2]);
    // console.log(parts);
    var t = hour*3600 + min*60 + sec;
    return t;
}

function secToTime(timeSec) {
    var sec = timeSec % 60;
    if(sec < 10) {
        sec = "0"+sec;
    }
    timeSec = Math.round((timeSec - sec) / 60);
    var min = timeSec % 60;
    if(min < 10) {
        min = "0"+min;
    }
    timeSec = Math.round((timeSec - min) / 60);
    var hour = timeSec % 24;

    return hour + ":" + min + ":" + sec;
}

function secToDuration(timeSec) {
    var sec = timeSec % 60;
    if(sec < 10) {
        sec = "0"+sec;
    }
    timeSec = Math.round((timeSec - sec) / 60);
    var min = timeSec % 60;
    if(min < 10) {
        min = "0"+min;
    }
    timeSec = Math.round((timeSec - min) / 60);

    return timeSec + ":" + min + ":" + sec;
}


exports.timeToSec = timeToSec;
exports.secToTime = secToTime;
exports.secToDuration = secToDuration;