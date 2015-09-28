var request = require('request');

module.exports = function (from, to, args) {
    var url = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?&locale=zh_TW&screenshot=false&fields=ruleGroups&key=AIzaSyDjYeBKwBrGq2I6FhxJj1il6R40buIKECo&url=' + args[1];
    request(url, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            /*global oktw*/
            oktw.say(from, to, JSON.parse(body).ruleGroups.SPEED.score);
         }
    });
};

module.exports.info = {name:'pagespeed', example:'.ps https://www.oktw.tw/', command:'ps'};
