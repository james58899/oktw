var request = require('request');

module.exports = function (from, to, args) {
    var arg = args.join(' ').replace('w ', '');
    var search = 'https://zh.wikipedia.org/w/api.php?format=json&action=query&list=search&srlimit=1&srprop&continue&srsearch=' + arg
    request(search, function(err, response, body) {
        if (!err && response.statusCode == 200 && JSON.parse(body).query.search[0].title) {
            var title = JSON.parse(body).query.search[0].title
            var options = {
                url:'https://zh.wikipedia.org/w/api.php?format=json&utf8&action=query&prop=extracts&exintro&explaintext&exchars=150&redirects&titles=' + title,
                headers: {
                    'Accept-Language': 'zh-TW,zh;q=0.8,en-US;q=0.5,en;q=0.3'
                },
                gzip: true
            };
            request(options, function(err, response, body) {
                if (!err && response.statusCode == 200) {
                    var data = JSON.parse(body);
                    var firstResult = Object.keys(data.query.pages);
                    oktw.say(from, to, '[wiki] ' + data.query.pages[firstResult[0]].extract + ' - http://zh.wikipedia.org/wiki/' + title);
                }
            })
         }
    });
};

module.exports.info = {name:'wiki', example:'.w google', command:'w'};
