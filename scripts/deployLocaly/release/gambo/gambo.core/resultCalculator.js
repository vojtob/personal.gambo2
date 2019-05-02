var st = require("./simpleTime");

function recalculate(team) {
    team = calculateLegs(team);
    // team = calculateRunners(team);
    team = calculateSummary(team);

    return team;
}

function calculateLegs(team) {
    team.lastLegDone = team.legs.length-1;

    for (index = 0; index < team.legs.length; index++) {
        // console.log("process leg " + index);
        var leg = team.legs[index];

        // start time
        if(team.startTimes.hasOwnProperty(index)) {
            // usek s preddefinovanym startom (prvy a teplicka nad vahom)
            leg.startTime = team.startTimes[index];
        } else {
            // ostatne sa nastavia podla predosleho end time
            leg.startTime = team.legs[index - 1].endTime;
        }

        leg.plannedDuration = st.secToDuration( Math.round( st.timeToSec(leg.plannedTempo) * leg.distance ) );
        if (leg.realDuration) {
            // zabehnuty usek
            // end time podla skutocneho trvania
            leg.endTime = st.secToTime(st.timeToSec(leg.startTime) + st.timeToSec(leg.realDuration));
            // diff
            leg.diff = st.secToDuration(st.timeToSec(leg.realDuration) - st.timeToSec(leg.plannedDuration));
            // real tempo
            leg.realTempo = st.getTempo(leg.realDuration, leg.distance);
        } else {
            // nebezany usek
            // end time podla planovaneho trvania
            leg.endTime = st.secToTime(st.timeToSec(leg.startTime) + st.timeToSec(leg.plannedDuration));
            // diff
            delete leg.diff;
            // real tempo
            delete leg.realTempo;
            team.lastLegDone = Math.min(index-1,team.lastLegDone);
        }
    }

    return team;
}

function calculateRunners(team) {
    // runners
/*    for (let runnerIndex = 0; runnerIndex < 12; runnerIndex++) {
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
    }*/

    return team;
}

function calculateSummary(team) {
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
    for (index = 0; index < team.legs.length; index++) {
        leg = team.legs[index];
        team.route.distance = Math.round((team.route.distance + leg.distance) * 100) / 100;
        team.route.up += leg.up;
        team.route.down += leg.down;
        team.route.difficulty += leg.difficulty;
        team.plan.duration += st.timeToSec(leg.plannedDuration);
        if (leg.realDuration) {
            team.real.duration += st.timeToSec(leg.realDuration);
        } else {
            team.real.duration += st.timeToSec(leg.plannedDuration);
        }
    }
    // convert to strings
    team.real.diff = st.secToDuration(team.real.duration - team.plan.duration);
    team.plan.duration = st.secToDuration(team.plan.duration);
    team.real.duration = st.secToDuration(team.real.duration);
    team.plan.tempo = st.getTempo(team.plan.duration, team.route.distance);
    team.real.tempo = st.getTempo(team.real.duration, team.route.distance);

    return team;
}

exports.recalculate = recalculate;
