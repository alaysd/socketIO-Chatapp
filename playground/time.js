var moment = require('moment');

var createdAt = 1234;
var date = moment(createdAt);

// var someTimeStamp = moment.valueOf();
// console.log(someTimeStamp);

console.log(date.format('hh:mm a'));
