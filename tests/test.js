var dataAccess = require("./gambo.core/dataAccess");
// var fs = require('fs');

dataAccess.getTeam(29, function (err, data) {
    console.log(JSON.stringify(data, null, 2));
    // console.log(typeof parseFloat((data.distance / 1000).toFixed(2)));
    var team = data;

    console.log('!!!!!!!!!!!!!!!!!!!!');
    console.log(JSON.stringify(data.runners, null, 2));

    console.log('!!!!!!!!!!!!!!!!!!!!');
    console.log(JSON.stringify(data.status, null, 2));

    console.log('!!!!!!!!!!!!!!!!!!!!');
    console.log(JSON.stringify(data.route, null, 2));
    console.log(JSON.stringify(data.plan, null, 2));
    console.log(JSON.stringify(data.real, null, 2));


    // save real data
    // fs.writeFile("realResults.js", JSON.stringify(data), function (err) {
    //     if (err) {
    //         console.error("Nepodarilo sa ulozit trasu:", JSON.stringify(err, null, 2));
    //     } else {
    //         console.log("DONE");
    //     }
    // });

    // tempa bezcov
    // for (let bezec = 0; bezec < 12; bezec++) {
    //     for (let sada = 0; sada < 4; sada++) {
    //         const leg = team.legs[12*sada+bezec];
    //         console.log((leg.legID) + ' : ' + leg.plannedTempo);                
    //     }
    // }
})

// fs.readFile('realResults.js', 'utf8', function (err, data) {
//     if (err) {
//         console.error("Unable to read route ", JSON.stringify(err, null, 2));
//     } else {
//         team = JSON.parse(data);
//         dataAccess.putTeam(team, function (err, data) {
//             if (err) {
//                 console.error("Nepodarilo sa ulozit team:", JSON.stringify(err, null, 2));
//             } else {
//                 console.log("DONE");
//             }
//         });
//     }
// });


