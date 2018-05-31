var AWS = require("aws-sdk");
var config = require('./config');

AWS.config.update({
    region: config.region,
    endpoint: config.endpoint
});

var docClient = new AWS.DynamoDB.DocumentClient()

// TEST PRENOSU 2

// function getTeamCount(teamID) {
//     return teams.length;
// }

function getTeam(teamID, callback) {
    getItem("TheRunTeam", { team: teamID }, callback);
}

function getLeg(legIndex, callback) {
    getItem("TheRunRoute", { legID: legIndex }, callback);
}

function getLegs(callback) {
    var params = {
        TableName: "TheRunRoute",
    };

    docClient.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to scan items. Error JSON:", JSON.stringify(err, null, 2));
            callback(err, null);
        } else {
            console.log("Scan succeeded");
            // console.log("Scan succeeded:", JSON.stringify(data, null, 2));
            callback(null, data.Items);
        }
    });
}

function getItem(tableName, keyParam, callback) {
    console.log("get" + tableName + " " + JSON.stringify(keyParam));
    var params = {
        TableName: tableName,
        Key: keyParam
    };
    console.log(params);

    docClient.get(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            callback(err, null);
        } else {
            // console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            callback(null, data.Item);
        }
    });
}

function putTeam(team, callback) {
    var params = {
        TableName: "TheRunTeam",
        Item: team
    }

    generalPut(params, callback);
    // docClient.put(params, function (err, data) {
    //     if (err) {
    //         console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    //         callback(err, data);
    //     } else {
    //         console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
    //         callback(err, data);
    //     }
    // });
}

function generalPut(params, callback) {
    docClient.put(params, function (err, data) {
        callback(err, data);
    });
}

exports.getTeam = getTeam;
exports.getLeg = getLeg;
exports.getLegs = getLegs;
exports.putTeam = putTeam;

exports.generalPut = generalPut;

// exports.getTeamCount = getTeamCount;
