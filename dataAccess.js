var AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-central-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient() 

// function getTeamCount(teamID) {
//     return teams.length;
// }

function getTeam(teamID, callback) {
    getItem(teamID, "Team", {team:teamID}, callback);
}

function getLeg(legID, callback) {
    getItem(legID, "Leg", {leg:legID}, callback);
}

function getItem(itemID, tableName, keyParam, callback) {
    // console.log("get" + tableName + " " + keyParam + " " + itemID);
    var params = {
        TableName: tableName,
        Key: keyParam
    };
    // console.log(params);
    
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
    
exports.getTeam = getTeam;
exports.getLeg = getLeg;
// exports.getTeamCount = getTeamCount;
