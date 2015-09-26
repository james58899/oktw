var request = require('request');

module.exports = function (from, to, args) {
    request.post({uri: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDjYeBKwBrGq2I6FhxJj1il6R40buIKECo', json: {"longUrl": args[1]}}, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            /*global oktw*/
            oktw.say(from, to, body.id);
         }
    });
};

module.exports.info = {name:'urlShort', example:'.gl www.oktw.tw', command:'gl'};
