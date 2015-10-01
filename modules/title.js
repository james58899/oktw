var request = require('request');
var cheerio = require('cheerio');
var url = require('url');
var iconv = require('iconv-lite');

module.exports = function (from, to, uri) {
    if (uri.length === 1) {
        uri = url.parse(uri[0]);
    }else{
        uri = url.parse(uri[1]);
    }
    var options = {
        url: encodeURI(uri.href),
        headers: {
            'User-Agent': 'request',
            'Cookie': 'over18=1',
            'Accept-Language': 'zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3'
        },
        timeout: 3000,
        gzip: true,
        encoding: null
    };
    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            try {
                var encode = response.headers['content-type'].match(/charset=\S+/i).toString().replace('charset=', '');
            }catch (ex){}
            if(encode !== undefined && !encode.match('utf-8')) {
                body = iconv.decode(body, encode);
            }
            $ = cheerio.load(body);
            var title =$('title').text().trim().replace(/\s/g, ' ');
            if (title != '') {
                /*global oktw*/
                oktw.say(from, to, '[Title] ' + title);
            }
        }
    });
};

module.exports.info = {name:'title', example:'.title https://www.google.com/', command:'title', rawcommand:/https?:\/\/\S*/i};
