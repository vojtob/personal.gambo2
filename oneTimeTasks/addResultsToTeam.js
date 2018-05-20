var AWS = require("aws-sdk");
var resultAPI = require("../resultAPI");
var dataAccess = require('../dataAccess');

// read team data
var lineReader = require('readline');
var team;

dataAccess.getTeam(29, function (err, teamdb) {
    if(err) {
        callback(message, "Nepodarilo sa mi zistiť info o tíme, skús prosím ešte raz.");
    } else {
        team = teamdb;
        if(!team.results) {
            team.results = [];
        }
        
        var stream = require('stream');
        var bufferStream = new stream.PassThrough();
        var fs = require('fs');
        var windows1250 = require('windows-1250');
        fs.readFile('./res/dataTheRunGula.csv', function (err, buf) {
            bufferStream.end(windows1250.decode(buf.toString('binary')));
        });
        lineReader = require('readline').createInterface({
            input: bufferStream
        });

        lineReader.on('line', function (line) {
            // add result for the team
            sline = line.split(";");
            // console.log("process leg " + parseInt(sline[0]) + " : " + sline);
            team.results.push( { distance: parseFloat(sline[3].replace(',', '.')), runnerName: sline[1], plannedDuration: sline[5] });
        });
        
        lineReader.on('close', function (line) {
            team = resultAPI.recalculateLegs(team);
            // store new results
            dataAccess.putTeam(team, function(err, data) {})
        });
    }    
})    

