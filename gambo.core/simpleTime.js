function timeToSec(timeString) {
    // console.log("timestring " + timeString);
    var parts = timeString.split(":");
    sec = 0;
    parts.forEach(part => {
        sec = 60*sec + parseInt(part);
        // console.log("part " + part + " sec " + sec);
    });
    // console.log("sec " +sec);
    return sec;
    // var hour = parseInt(parts[0]);
    // var min = parseInt(parts[1]);
    // var sec = parseInt(parts[2]);
    // // console.log(parts);
    // var t = hour*3600 + min*60 + sec;
    // return t;
}

function secToTime(timeSec) {
    return secToString(timeSec, 1);
}

function secToDuration(timeSec) {
    return secToString(timeSec, 2);
}

function getTempo(duration, distance) {
    var sec = timeToSec(duration);
    var secTempo = Math.round(sec / distance);
    return secToString(secTempo, 3);
}

function secToString(timeSec, mode) {
    /*
    1 - time - najviac 24h
    2 - duration - neobmedzene hodiny
    3 - tempo - bez hodin, iba minuty a sekundy
    */
    var isNegative = (timeSec < 0);
    if(isNegative) {
        timeSec = -timeSec;
    }
    // console.log("secToDuration timeSec: " + timeSec);
    var sec = timeSec % 60;
    // console.log("secToDuration sec: " + sec);
    timeSec = Math.round((timeSec - sec) / 60);
    var min = timeSec % 60;
    // console.log("secToDuration min: " + min);
    timeSec = Math.round((timeSec - min) / 60);
    var hour;
    if(mode == 1) {
        hour = timeSec % 24;
    } else {
        hour = timeSec;
    }
    // console.log("secToDuration hour: " + hour);
    
    if(sec < 10) {
        sec = "0"+sec;
    }
    if(min < 10) {
        min = "0"+min;
    }
    var stringTime = min + ":" + sec;
    if(mode != 3) {
        stringTime = hour + ":" + stringTime;
    }
    if(isNegative) {
        stringTime = "-" + stringTime;
    }
    return stringTime;
}

exports.timeToSec = timeToSec;
exports.secToTime = secToTime;
exports.secToDuration = secToDuration;
exports.getTempo = getTempo;