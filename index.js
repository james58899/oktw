var irc = require('irc');
var express = require('express');


//Web Servcie Start
var http = express();
http.set('port', (process.env.PORT || 5000));

http.use(express.static(__dirname + '/public'));

http.get('*', function (req, res) {
  res.send('Hello World!');
});

http.listen(http.get('port'), function() {
  console.log('Node app is running on port', http.get('port'));
});


//IRC Start
var client = new irc.Client('kornbluth.freenode.net', 'oktw', {
    channels: ['#oktw', '#ysitd', '#koru1130'],
    userName: 'oktw',
    realName: 'oktw - https://www.oktw.tw/',
    port: 7000,
    secure: true,
});
var delayA = 3;
var delayB = 5;
var delayC;

function say (from, target, message) {
    if (delayC === from) {
        delayA--;
    }else{
        delayA = 3;
    }
    if (delayA >0) {
        if (delayB > 0) {
            client.say(target, message);
            delayB--;
        }
    }
    delayC = from;
}

setInterval(function(){
    if (delayB < 5) {
        delayB++;
    }
}, 1000);

//print log to console
client.addListener('message#', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
});

client.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
});

client.addListener('selfMessage', function (to, text) {
    console.log('ME => ' + to + ': ' + text)
})

//autojoin
client.addListener('invite', function(channel, from, message) {
    client.join(channel);
});

//ping and pong
client.addListener('message#', function(from, to, message) {
    if (message === 'ping') {
        say(from, to, 'pong');
    }
});

module.exports = say;
