var st = require("./simpleTime");
var dataAccess = require('./dataAccess');

function setRealDuration(teamID, leg, duration) {
    dataAccess.getTeam(teamID, function (err, team) {
        if(err) {
            callback(message, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
        } else {
            // set real duration
            team.results[leg-1].realDuration = duration;
            team = recalculateLegs(team);
            // store new results
            dataAccess.putTeam(team, function(err, data) {})
        }
    })
}

function clearRealDuration(teamID, leg) {
    dataAccess.getTeam(teamID, function (err, team) {
        if(err) {
            callback(message, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
        } else {
            // delete real duration
            delete team.results[leg-1].realDuration;
            team = recalculateLegs(team);
            // store new results
            dataAccess.putTeam(team, function(err, data) {})
        }
    })
}

function setPlannedDuration(teamID, leg, duration) {
    dataAccess.getTeam(teamID, function (err, team) {
        if(err) {
            callback(message, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
        } else {
            // set real duration
            team.results[leg-1].plannedDuration = duration;
            team = recalculateLegs(team);
            // store new results
            dataAccess.putTeam(team, function(err, data) {})
        }
    })
}

function setStartKosice(teamID, startTime) {
    dataAccess.getTeam(teamID, function (err, team) {
        if(err) {
            callback(message, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
        } else {
            // set real duration
            team.startTimeKE = startTime;
            team = recalculateLegs(team);
            // store new results
            dataAccess.putTeam(team, function(err, data) {})
        }
    })
}

function setStartTeplicka(teamID, startTime) {
    dataAccess.getTeam(teamID, function (err, team) {
        if(err) {
            callback(message, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
        } else {
            // set real duration
            team.startTimeTeplicka = startTime;
            team = recalculateLegs(team);
            // store new results
            dataAccess.putTeam(team, function(err, data) {})
        }
    })
}

function recalculateLegs(team) {
    var leg;
    var totalRealDuration = 0;
    var totalPlannedDuration = 0;

    // start times
    for (let index = 0; index < 48; index++) {
        leg = team.results[index];

        // start time
        if(index == 0) {
            // prvy a teplickovy usek sa nemenia startove casy
            leg.startTime = team.startTimeKE;
        } else if (index == 28) {
            leg.startTime = team.startTimeTeplicka;
        } else {
            // ostatne sa nastavia podla predosleho end time
            leg.startTime = team.results[index-1].endTime;
        }

        if(leg.realDuration) {
            // end time podla toho ci mame skutocne trvanie
            leg.endTime = st.secToTime(st.timeToSec(leg.startTime) + st.timeToSec(leg.realDuration));
            // total real duration
            totalRealDuration += st.timeToSec(leg.realDuration);
            // diff
            leg.diff = st.secToDuration(st.timeToSec(leg.realDuration) - st.timeToSec(leg.plannedDuration));
            // real tempo
            leg.realTempo = st.getTempo(leg.realDuration, leg.distance);
        } else {
            // end time podla toho ci mame skutocne trvanie
            leg.endTime = st.secToTime(st.timeToSec(leg.startTime) + st.timeToSec(leg.plannedDuration));
            // total real duration
            totalRealDuration += st.timeToSec(leg.plannedDuration);
            // diff
            delete leg.diff;
            // real tempo
            delete leg.realTempo;
        }
        // planned tempo
        leg.plannedTempo = st.getTempo(leg.plannedDuration, leg.distance);
        // planned total duration
        totalPlannedDuration += st.timeToSec(leg.plannedDuration);
    }

    team.totalRealDuration = st.secToDuration(totalRealDuration);
    team.totalPlannedDuration = st.secToDuration(totalPlannedDuration);
    team.totalDiff = st.secToDuration(st.timeToSec(team.totalRealDuration) - st.timeToSec(team.totalPlannedDuration));
    
    return team;
}

exports.setRealDuration = setRealDuration;
exports.setPlannedDuration = setPlannedDuration;
exports.clearRealDuration = clearRealDuration;
exports.recalculateLegs = recalculateLegs;
exports.setStartKosice = setStartKosice;
exports.setStartTeplicka = setStartTeplicka;