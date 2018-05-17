"use strict";

var dataAccess = require('./dataAccess');

const defaultMessage = "Ahoj, tu je runbot od DXC Technology. Skús sa ma niečo opýtať, napríklad: tim 29 alebo úsek 13" 

//////////////////////
// Known messages
/////////////////////
const matchTim = /(tim|Tim|team|Team|tím|Tím)\s+\d+/;
const replaceTim = /(tim|Tim|team|Team|tím|Tím)\s+/;

const matchLeg = /(usek|Usek|úsek|Úsek|leg|Leg)\s+\d+/;
const replaceLeg = /(usek|Usek|úsek|Úsek|leg|Leg)\s+/;



function processMessage(message) {
    // console.log('input: ' + message)
    // if(message == '?') {
    //     return helpMessage;
    // }

    if(matchTim.test(message)) {
        var teamNumber = parseInt(message.replace(replaceTim, ''));        
        return formatTeam(dataAccess.getTeam(teamNumber));
    }
    
    if(matchLeg.test(message)) {
        var legNumber = parseInt(message.replace(replaceLeg, ''));        
        return formatLeg(dataAccess.getLeg(legNumber));
    }
    
    return defaultMessage;
}

function formatTeam(team) {
    if(team == undefined) {
        return "O tíme sa takýmto číslom neviem, tímov je " + dataAccess.getTeamCount();
    }
    return "Tím " + team.id + " sa volá " + team.name + ". Štartoval o " + team.start + " v kategórii " + team.category;
}

function formatLeg(leg) {
    if(leg == undefined) {
        return "Takýto úsek neexistuje, skús medzi 1 a 48.";
    }
    var d = parseFloat(leg.distance);
    return "Úsek " + leg.id + ": " + leg.from + " - " + leg.to + " meria " + (d/1000).toFixed(2) + " km. Stúpanie " + parseFloat(leg.up).toFixed(0) + " m, klesanie " + parseFloat(leg.down).toFixed(0) + " m.";
}

exports.processMessage = processMessage;