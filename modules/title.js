var request = require('request');
var cheerio = require('cheerio');

module.exports = function (from, to, url) {
    if (url.length === 1) {
        url = url[0];
    }else{
        url = url[1];
    }
    request(url,{timeout: 1500}, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            var title =$('title').text();
            if (title !== undefined) {
                /*global oktw*/
                oktw.say(from, to, '[Title] ' + title);
            }
        }
    });
};

module.exports.info = {name:'title', example:'.title https://www.google.com/', command:'title', rawcommand:/https?:\/\/\S*/i};
