var request = require('request');

module.exports = function (from, to, args) {
    var url = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?&locale=zh_TW&screenshot=false&fields=ruleGroups&key=AIzaSyDjYeBKwBrGq2I6FhxJj1il6R40buIKECo&url=' + args[1];
    request(url, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            /*global oktw*/
            oktw.say(from, to, '分數：' + JSON.parse(body).ruleGroups.SPEED.score + '/100');
         }
    });
};

module.exports.info = {name:'PageSpeed Insights', example:'.ps https://www.oktw.tw/', command:'ps'};
