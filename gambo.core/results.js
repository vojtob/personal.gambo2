var st = require("./simpleTime");
var dataAccess = require('./dataAccess');

function setRealDuration(teamID, legID, duration, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
        } else {
            // set real duration
            team.legs[legID - 1].realDuration = duration;
            team = recalculateLegs(team);
            // store new results
            dataAccess.putTeam(team, callback)
        }
    })
}

function clearRealDuration(teamID, legID, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
        } else {
            // delete real duration
            delete team.legs[legID - 1].realDuration;
            team = recalculateLegs(team);
            // store new results
            dataAccess.putTeam(team, callback)
        }
    })
}

function getResult(teamID, legID, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
        } else {
            callback(null, team.legs[legID - 1]);
        }
    })
}

function getTeamResult(teamID, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
        } else {
            callback(null, team);
        }
    })
}

// function setPlannedDuration(teamID, leg, duration) {
//     dataAccess.getTeam(teamID, function (err, team) {
//         if(err) {
//             callback(message, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
//         } else {
//             // set real duration
//             team.legs[leg-1].plannedDuration = duration;
//             team = recalculateLegs(team);
//             // store new results
//             dataAccess.putTeam(team, function(err, data) {})
//         }
//     })
// }

function setPlannedTempo(teamID, leg, tempo, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, null);
        } else {
            // set real duration
            var dist = team.legs[leg - 1].distance;
            var tempoSec = st.timeToSec(tempo);
            console.log("tempoSec " + tempoSec);
            var dur = Math.round(tempoSec * dist);
            console.log("dur " + dur);
            var planDur = st.secToDuration(dur);
            console.log("planDur " + planDur);
            team.legs[leg - 1].plannedDuration = planDur;
            console.log("team legs planned dur " + team.legs[leg - 1].plannedDuration);
            // team.legs[leg - 1].plannedTempo = tempo;
            team = recalculateLegs(team);
            // store new results
            console.log("team legs planned dur 2 " + team.legs[leg - 1].plannedDuration);
            dataAccess.putTeam(team, function (err, data) { })
        }
    })


    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(message, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
        } else {
            // set real duration
            team = recalculateLegs(team);
            // store new results
            dataAccess.putTeam(team, function (err, data) { callback(err, data) })
        }
    })
}

function setStartKosice(teamID, startTime, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, null);
        } else {
            // set real duration
            team.status.startTimeKE = startTime;
            team = recalculateLegs(team);
            // store new results
            dataAccess.putTeam(team, function (err, data) { 
                console.log("start KE " + team.legs[0].startTime);
                callback(err,data);
            });
        }
    })
}

function setStartTeplicka(teamID, startTime) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, null);
        } else {
            // set real duration
            team.status.startTimeTeplicka = startTime;
            team = recalculateLegs(team);
            // store new results
            dataAccess.putTeam(team, function (err, data) { callback(err,data) })
        }
    })
}

function recalculateLegs(team) {
    var leg;
    var totalRealDuration = 0;
    var totalPlannedDuration = 0;
    var lastLegDone = -1;
    var totalDistance = 0;

    // start times
    for (let index = 0; index < 48; index++) {
        leg = team.legs[index];

        // start time
        if (index == 0) {
            // prvy a teplickovy usek sa nemenia startove casy
            leg.startTime = team.status.startTimeKE;
        } else if (index == 28) {
            leg.startTime = team.status.startTimeTeplicka;
        } else {
            // ostatne sa nastavia podla predosleho end time
            leg.startTime = team.legs[index - 1].endTime;
        }

        if (leg.realDuration) {
            // end time podla toho ci mame skutocne trvanie
            leg.endTime = st.secToTime(st.timeToSec(leg.startTime) + st.timeToSec(leg.realDuration));
            // total real duration
            totalRealDuration += st.timeToSec(leg.realDuration);
            // diff
            leg.diff = st.secToDuration(st.timeToSec(leg.realDuration) - st.timeToSec(leg.plannedDuration));
            // real tempo
            leg.realTempo = st.getTempo(leg.realDuration, leg.distance);
            lastLegDone = index;
        } else {
            // end time podla toho ci mame skutocne trvanie
            // console.log("start " + leg.startTime);
            // console.log("dur " + leg.plannedDuration);
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
        totalDistance += leg.distance;
    }

    team.status.totalRealDuration = st.secToDuration(totalRealDuration);
    team.status.totalPlannedDuration = st.secToDuration(totalPlannedDuration);
    team.status.totalDiff = st.secToDuration(st.timeToSec(team.status.totalRealDuration) - st.timeToSec(team.status.totalPlannedDuration));
    team.status.lastLegDone = lastLegDone;
    team.status.totalDistance = totalDistance.toFixed(2);
    team.status.tempo = st.getTempo(team.status.totalRealDuration, totalDistance);

    return team;
}

exports.setRealDuration = setRealDuration;
exports.clearRealDuration = clearRealDuration;
exports.getResult = getResult;
exports.getTeamResult = getTeamResult;
// internal
exports.recalculateLegs = recalculateLegs;
// modify plan
// exports.setPlannedDuration = setPlannedDuration;
exports.setPlannedTempo = setPlannedTempo;
exports.setStartKosice = setStartKosice;
exports.setStartTeplicka = setStartTeplicka;