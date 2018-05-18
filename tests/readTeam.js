var AWS = require("aws-sdk");

AWS.config.update({
    region: "eu-central-1",
    endpoint: "http://localhost:8000"
});
AWS.config.update({endpoint: "https://dynamodb.eu-central-1.amazonaws.com"});

var docClient = new AWS.DynamoDB.DocumentClient()

var params = {
    TableName: "Team",
    Key: {
        "team": 29
    }
};

docClient.get(params, function (err, data) {
    if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
});
