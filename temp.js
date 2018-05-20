// var st = require("./simpleTime");

// var duration = "1:30:0";
// var distance = 21.1;
// console.log(st.getTempo(duration, distance));

// var plannedDuration = "0:30:40";
// var realDuration = "0:28:51";
// var diffSec = st.timeToSec(realDuration) - st.timeToSec(plannedDuration);
// var diff = st.secToDuration(diffSec);
// console.log("diff sec " + diffSec);
// console.log("diff " + diff);

var resultAPI = require("./resultAPI");
// resultAPI.setRealDuration(29, 1, "1:04:13");
// resultAPI.setRealDuration(29, 3, "0:45:20");
resultAPI.clearRealDuration(29,3);
// resultAPI.setStartTeplicka(8, "17:00:00");