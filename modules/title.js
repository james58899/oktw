var request = require('request');
var cheerio = require('cheerio');

module.exports = function (from, to, url) {
    if (url.length === 1) {
        url = url[0];
    }else{
        url = url[1];
    }
    var options = {
        url: url,
        headers: {
            'User-Agent': 'chrome32 on win8 Mozilla/5.0 (Windows NT 6.2; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1667.0 Safari/537.36',
            'Cookie': 'over18=1'
        },
        timeout: 1500
    };
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            $ = cheerio.load(body);
            var title =$('title').text().replace(/\s/g, ' ');
            if (title != '') {
                /*global oktw*/
                oktw.say(from, to, '[Title] ' + title);
            }
        }
    });
};

module.exports.info = {name:'title', example:'.title https://www.google.com/', command:'title', rawcommand:/https?:\/\/\S*/i};
