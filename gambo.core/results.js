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
            dataAccess.putTeam(team, callback);
        }
    })
}

function setDistance(teamID, leg, dist, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, null);
        } else {
            // set real duration
            var tempo = team.legs[leg - 1].plannedTempo;
            var tempoSec = st.timeToSec(tempo);
            console.log("tempoSec " + tempoSec);
            console.log("dist: " + dist);
            console.log("dist type of : " + typeof dist);
            var fDist = parseFloat(dist);
            console.log("fdist: " + fDist);
            fDist = Math.round(fDist * 100) / 100;
            console.log("fdist 2 : " + fDist);
            var dur = Math.round(tempoSec * fDist);
            console.log("dur sec: " + dur);
            var planDur = st.secToDuration(dur);
            console.log("planDur " + planDur);
            team.legs[leg - 1].plannedDuration = planDur;
            team.legs[leg - 1].distance = fDist;
            console.log("team legs planned dur " + team.legs[leg - 1].plannedDuration);
            console.log("team legs planned dist " + team.legs[leg - 1].distance);
            // team.legs[leg - 1].plannedTempo = tempo;
            team = recalculateLegs(team);
            // store new results
            console.log("team legs planned dur 2 " + team.legs[leg - 1].plannedDuration);
            console.log("team legs planned dist 2 " + team.legs[leg - 1].distance);
            dataAccess.putTeam(team, callback);
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
                callback(err, data);
            });
        }
    })
}

function setStartTeplicka(teamID, startTime, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, null);
        } else {
            // set real duration
            team.status.startTimeTeplicka = startTime;
            team = recalculateLegs(team);
            // store new results
            dataAccess.putTeam(team, function (err, data) { callback(err, data) })
        }
    })
}

function recalculate(teamID, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, null);
        } else {
            team = recalculateLegs(team);
            // store new results
            dataAccess.putTeam(team, function (err, data) { callback(err, data) })
        }
    })
}

function transform(teamID, callback) {
    dataAccess.getTeam(teamID, function (err, team) {
        if (err) {
            callback(err, null);
        } else {
            team.legs.forEach(leg => {
                leg.up = parseInt(leg.up);
                leg.down = parseInt(leg.down);
            });

            team.startTimeKE = "10:00:00";
            team.startTimeTeplicka = "17:00:00";
            team.lastLegDone = 47;
            delete team.status;

            if (team.runners) {
                team.runners = [];
                for (let runnerIndex = 0; runnerIndex < 12; runnerIndex++) {
                    var runner = {};
                    runner.id = (runnerIndex + 1);
                    runner.name = team.legs[runnerIndex].runnerName;
                    team.runners.push(runner);
                }
            }

            // team.route = {};
            // team.route.distance = team.status.tota
            // team = recalculateLegs(team);
            // store new results
            dataAccess.putTeam(team, function (err, data) { callback(err, data) })
        }
    })
}

function recalculateLegs(team) {
    team.lastLegDone = -1;

    // legs
    for (let index = 0; index < 48; index++) {
        console.log("process leg " + index);
        var leg = team.legs[index];

        // start time
        if (index == 0) {
            // prvy a teplickovy usek sa nemenia startove casy
            leg.startTime = team.startTimeKE;
        } else if (index == 28) {
            leg.startTime = team.startTimeTeplicka;
        } else {
            // ostatne sa nastavia podla predosleho end time
            leg.startTime = team.legs[index - 1].endTime;
        }

        if (leg.realDuration) {
            // end time podla toho ci mame skutocne trvanie
            leg.endTime = st.secToTime(st.timeToSec(leg.startTime) + st.timeToSec(leg.realDuration));
            // diff
            leg.diff = st.secToDuration(st.timeToSec(leg.realDuration) - st.timeToSec(leg.plannedDuration));
            // real tempo
            leg.realTempo = st.getTempo(leg.realDuration, leg.distance);
            team.lastLegDone = index;
        } else {
            // end time podla toho ci mame skutocne trvanie
            leg.endTime = st.secToTime(st.timeToSec(leg.startTime) + st.timeToSec(leg.plannedDuration));
            // diff
            delete leg.diff;
            // real tempo
            delete leg.realTempo;
        }
        // planned tempo
        leg.plannedTempo = st.getTempo(leg.plannedDuration, leg.distance);
    }

    // runners
    for (let runnerIndex = 0; runnerIndex < 12; runnerIndex++) {
        const runner = team.runners[runnerIndex];
        runner.route = {};
        runner.route.distance = 0;
        runner.route.up = 0;
        runner.route.down = 0;
        runner.route.difficulty = 0;
        runner.plan = {};
        runner.plan.duration = 0;
        runner.real = {};
        runner.real.duration = 0;
        for (let sada = 0; sada < 4; sada++) {
            var leg = team.legs[12 * sada + runnerIndex];
            runner.route.distance = Math.round((runner.route.distance + leg.distance) * 100) / 100;
            runner.route.up += leg.up;
            runner.route.down += leg.down;
            runner.route.difficulty += leg.difficulty;
            runner.plan.duration += st.timeToSec(leg.plannedDuration);
            if (leg.realDuration) {
                runner.real.duration += st.timeToSec(leg.realDuration);
            } else {
                runner.real.duration += st.timeToSec(leg.plannedDuration);
            }
        }
        // convert to strings
        console.log("runner dur " + runner.plan.duration + " " + (typeof runner.plan.duration));
        runner.real.diff = st.secToDuration(runner.real.duration - runner.plan.duration);
        runner.plan.duration = st.secToDuration(runner.plan.duration);
        runner.real.duration = st.secToDuration(runner.real.duration);
        runner.plan.tempo = st.getTempo(runner.plan.duration, runner.route.distance);
        runner.real.tempo = st.getTempo(runner.real.duration, runner.route.distance);
    }

    // recalculate team
    team.route = {};
    team.route.distance = 0;
    team.route.up = 0;
    team.route.down = 0;
    team.route.difficulty = 0;
    team.plan = {};
    team.plan.duration = 0;
    team.real = {};
    team.real.duration = 0;
    for (let runnerIndex = 0; runnerIndex < 12; runnerIndex++) {
        const runner = team.runners[runnerIndex];
        team.route.distance = Math.round((team.route.distance + runner.route.distance) * 100) / 100;
        team.route.up += runner.route.up;
        team.route.down += runner.route.down;
        team.route.difficulty += runner.route.difficulty;
        team.plan.duration += st.timeToSec(runner.plan.duration);
        if (leg.realDuration) {
            team.real.duration += st.timeToSec(runner.real.duration);
        } else {
            team.real.duration += st.timeToSec(runner.plan.duration);
        }
    }
    // convert to strings
    console.log("team dur " + team.plan.duration + " " + (typeof team.plan.duration));
    team.real.diff = st.secToDuration(team.real.duration - team.plan.duration);
    team.plan.duration = st.secToDuration(team.plan.duration);
    team.real.duration = st.secToDuration(team.real.duration);
    team.plan.tempo = st.getTempo(team.plan.duration, team.route.distance);
    team.real.tempo = st.getTempo(team.real.duration, team.route.distance);

    return team;
}

exports.setRealDuration = setRealDuration;
exports.clearRealDuration = clearRealDuration;
exports.getResult = getResult;
exports.getTeamResult = getTeamResult;
// internal
exports.recalculateLegs = recalculateLegs;
exports.recalculate = recalculate;
exports.transform = transform;
// modify plan
// exports.setPlannedDuration = setPlannedDuration;
exports.setPlannedTempo = setPlannedTempo;
exports.setStartKosice = setStartKosice;
exports.setStartTeplicka = setStartTeplicka;
exports.setDistance = setDistance;