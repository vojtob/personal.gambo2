var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "eu-central-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "Movies",
    Item: {
        "year":  2015,
        "title": "The Big New Movie",
        "info":  {
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
};

console.log("Adding a new item...");
docClient.put(params, function(err, data) {
    if (err) {
        console.error("Unable to add movie", JSON.stringify(err, null, 2));
    } else {
        console.log("PutItem succeeded:", data);
    }
});
