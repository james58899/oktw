var irc = require('irc');
var express = require('express');
var http = express();


//Web Servcie Start
http.set('port', (process.env.PORT || 5000));

http.use(express.static(__dirname + '/public'));

http.get('/wakemydyno.txt', function (req, res) {
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

client.addListener('message#', function (from, to, message) {
    console.log(from + ' => ' + to + ': ' + message);
});

client.addListener('pm', function (from, message) {
    console.log(from + ' => ME: ' + message);
});

client.addListener('invite', function(channel, from, message) {
    client.join(channel);
});

client.addListener('message#', function(from, to, message) {
    if (message === 'ping') {
        say(from, to, 'pong');
    }
    else if (message === '.quit' && from === 'james58899') {
        client.disconnect();
        process.exit(0);
    }
    //else if (message.match(/^\..*/)) {
    //    say(from, to, '我好像聽到熟悉的聲音？');
    //}
});

module.exports = say;
