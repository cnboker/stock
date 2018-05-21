var moment = require('moment');
var data =[
    {date:'2018-04-03'},
    {date:'2018-04-01'},
    {date:'2018-03-01'}
]

data.sort(function (left, right) {
    return moment.utc(left.date).diff(moment.utc(right.date))
});

console.log(data)