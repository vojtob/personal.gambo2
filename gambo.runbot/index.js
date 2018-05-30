'use strict';

let VERIFY_TOKEN = "VOJTO_DXC_RUNBOT";

var https = require('https');
var msgProcessor = require('./msg');

console.log('Loading function');

exports.handler = (event, context, callback) => {
    console.log('RunBOT got a message');

    // process GET request
    if (event.queryStringParameters !== null && event.queryStringParameters !== undefined) {
        console.log('RunBOT GET');
        
        var queryParams = event.queryStringParameters;
        var mode = queryParams['hub.mode'];
        var token = queryParams['hub.verify_token'];
        var challenge = queryParams['hub.challenge'];
        
        // Checks if a token and mode is in the query string of the request
        if (mode && token) {
            // Checks the mode and token sent is correct
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {
                // Responds with the challenge token from the request
                console.log('WEBHOOK_VERIFIED');
                var response = {
                    'body': challenge,
                    'statusCode': 200
                };
                console.log("Success call");
                callback(null, response);
            } else {
                // Responds with '403 Forbidden' if verify tokens do not match
                console.log("403 - Nesedi token");
                callback(null, {'statusCode': 403});
            }
        } else {
            // Returns a '404 Not Found' if event is not from a page subscription
            console.log("404 - Nie su parametre");
            callback(null, {'statusCode': 404});
        }
    } else {
        console.log('RunBOT POST');
        var data;
        var testOnly = false;
        if(event.body instanceof Object) {
            console.log("test object sent");
            data = event.body;
            testOnly = true;
        } else {
            data = JSON.parse(event.body);
        }

        // Make sure this is a page subscription
        if (data.object === 'page') {
            // Iterate over each entry - there may be multiple if batched
            data.entry.forEach(function(entry) {
                // Iterate over each messaging event
                entry.messaging.forEach(function (msg) {
                    if (msg.message) {
                        receivedMessage(msg, testOnly);
                    } else {
                        console.log("Webhook received unknown event: ", event);
                    }
                });
            });
        }
        
        // Assume all went well.
        // You must send back a 200, within 20 seconds, to let us know
        // you've successfully received the callback. Otherwise, the request
        // will time out and we will keep trying to resend.
        callback(null, {'body': "ok", 'statusCode': 200 });
    }
};

function receivedMessage(event, testOnly) {
    var senderID = event.sender.id;
    var recipientID = event.recipient.id;
    var timeOfMessage = event.timestamp;
    var message = event.message;
    console.log("Received message for user %d and page %d at %d with message:", senderID, recipientID, timeOfMessage);
    console.log(JSON.stringify(message));

    var messageText = message.text;
    if (message.text) {
        msgProcessor.processMessage(messageText, function(inMessage, outMessage) {
            if(testOnly) {
                console.log("Message processed to: " + outMessage);
            } else {
                sendTextMessage(senderID, outMessage);
            }
        });
    } else {
        // sendTextMessage(senderID, "Ja rozumiem iba jednoduchým textovým správam");
    }
}

function sendTextMessage(recipientId, messageText) {
    var messageData = {
        "recipient": {
            "id": recipientId
        },
        "message": {
            "text": messageText
        }
    };
    callSendAPI(messageData);
}

function callSendAPI(messageData) {
    var body = JSON.stringify(messageData);
    var path = '/v2.6/me/messages?access_token=' + 'EAACYSH4YdGcBAJDlx0XwGEjIlqTntZARP9eRB5KZBHr6ZAZA0c4kuRSCwQBD26Q0GVQfZBV7xvVfidjMZAGfhC0vYUmwhr8MHCMDvM0V4SGTEeLoccVbX95NTzYBsswnpC0xZCVPMwDD1cj3Lt80qAeQfKUS4lOkZCRWzFBi1MSEaAZDZD';
    var options = {
        host: "graph.facebook.com",
        path: path,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };
    var callback = function (response) {
        var str = ''
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {

        });
    }
    var req = https.request(options, callback);
    req.on('error', function (e) {
        console.log('problem with request: ' + e);
    });

    req.write(body);
    req.end();
}