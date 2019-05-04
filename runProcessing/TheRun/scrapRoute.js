var request = require('request');
var fs = require('fs');
// var windows1250 = require('windows-1250');

// windows1250.

// request('https://therun.sk/data/track/segments').pipe(fs.createWriteStream('route.json'));


// request('https://therun.sk/data/track/segments').pipe(fs.createWriteStream('route.json'));

request('https://therun.sk/data/track/segments', function (error, response, body) {
    if (error) {
        console.error("Nepodarilo sa stiahnut trasu:", JSON.stringify(err, null, 2));
    } else {
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.

        data = JSON.parse(body);
        fs.writeFile("route.js", JSON.stringify(data), function (err) {
            if (err) {
                console.error("Nepodarilo sa ulozit trasu:", JSON.stringify(err, null, 2));
            } else {
                console.log("DONE");
            }
        });
    }
});