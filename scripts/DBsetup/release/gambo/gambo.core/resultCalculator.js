var st = require("./simpleTime");

function recalculate(team) {
    team = calculateLegs(team);
    team = calculateRunners(team);
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
    runners = [];

    for (index = 0; index < team.legs.length; index++) {
        // console.log("process leg " + index);
        var leg = team.legs[index];

        runnerName = leg.runnerName;
        runner = null;
        // skus najst uz existujuceho bezca
        for (i = 0; i < runners.length; i++) {
            r = runners[i];
            if(r.name === runnerName) {
                runner = r;
                break;
            }
        }
        if(runner == null) {
            // new runner
            runner = {};
            runners.push(runner);
            runner.name = runnerName;
            runner.route = {};
            runner.route.distance = 0;
            runner.route.up = 0;
            runner.route.down = 0;
            runner.route.difficulty = 0;
            runner.duration = 0;
            runner.legs = [];
            // runner.plan = {};
            // runner.plan.duration = 0;
            // runner.real = {};
            // runner.real.duration = 0;
        }
        // add leg to runner
        runner.route.distance = Math.round((runner.route.distance + leg.distance) * 100) / 100;
        runner.legs.push(index);
        runner.route.up += leg.up;
        runner.route.down += leg.down;
        runner.route.difficulty += leg.difficulty;
        // runner.plan.duration += st.timeToSec(leg.plannedDuration);
        if (leg.realDuration) {
            runner.duration += st.timeToSec(leg.realDuration);
        } else {
            runner.duration += st.timeToSec(leg.plannedDuration);
        }
    }
    
    // convert to strings
    for (runnerIndex = 0; runnerIndex < runners.length; runnerIndex++) {
        runner = runners[runnerIndex];
        // runner.real.diff = st.secToDuration(runner.real.duration - runner.plan.duration);
        runner.duration = st.secToDuration(runner.duration);
        runner.tempo = st.getTempo(runner.duration, runner.route.distance);
    }

    team.runners = runners;

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
