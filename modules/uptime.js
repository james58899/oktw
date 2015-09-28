var util = require('util');

module.exports = function (from, to, args) {
    var min = Math.floor(process.uptime() / 60 % 60);
    var hour = Math.floor(process.uptime() / 3600 % 24);
    var day = Math.floor(process.uptime() / 86400);
    /*global oktw*/
    if (day === 0) {
        if (hour === 0) {
            oktw.say(from, to, min + ' min');
        }else{
            oktw.say(from, to, util.format('%s hours, %s min', hour, min));
        }
    }else{
        oktw.say(from, to, util.format('%s days, %s hours, %s min', day, hour, min));
    }
};

module.exports.info = {name:'uptime', command:'uptime'};
