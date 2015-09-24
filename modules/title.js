var request = require('request');

module.exports = function (url) {
    if (url.length === 1) {
        url = url[0];
    }else{
        url = url[1];
    }
    request(url,{timeout: 1500}, function(error, response, body) {
        if (!error && response.statusCode == 200 && body.match(/<title>.*<\/title>/i)) {
            var title = body.match(/<title>.*<\/title>/i).toString().replace(/<\/?title>/ig, '');
            return '[Title] ' + title;
        }
    })
};

module.exports.info = {name:'title', help:'Analysis url title', command:'title', rawcommand:'/https?:\/\/\S*/i'};
