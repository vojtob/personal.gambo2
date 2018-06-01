var st = require("../gambo.core/simpleTime");

var duration = "0:57:35";
var distance = 10.02;
console.log(st.getTempo(duration, distance));

// var plannedDuration = "0:30:40";
// var realDuration = "0:28:51";
// var diffSec = st.timeToSec(realDuration) - st.timeToSec(plannedDuration);
// var diff = st.secToDuration(diffSec);
// console.log("diff sec " + diffSec);
// console.log("diff " + diff);

// var resultAPI = require("./gambo/results");
// resultAPI.setRealDuration(29, 1, "1:04:13", function(err, data) {
//     console.log("Real duration set");
// });
// resultAPI.setRealDuration(29, 2, "1:11:13", function (err, data) {
//     console.log("Real duration set");
// });
// resultAPI.clearRealDuration(29, 1, function(err, data) {
//         console.log("Real duration cleared");
// });
// resultAPI.setStartTeplicka(8, "17:00:00");