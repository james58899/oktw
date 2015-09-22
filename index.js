var irc = require('irc');
var express = require('express');
var moduleManager = require('./moduleManager');

//Web Servcie Start
var http = express();
http.set('port', (process.env.PORT || 5000));
http.get('*', function (req, res) {
  res.send('Hello World!');
});
http.listen(http.get('port'));
//IRC Start
var oktw = new irc.Client('kornbluth.freenode.net', 'oktw', {
    channels: ['#oktw', '#ysitd', '#koru1130'],
    userName: 'oktw',
    realName: 'oktw - https://www.oktw.tw/',
    port: 7000,
    secure: true,
});

var delayA = 3;
var delayB = 5;
var delayC;
say = function (from, target, message) {
    if (delayC === from) {
        delayA--;
    }else{
        delayA = 3;
    }
    if (delayA >0) {
        if (delayB > 0) {
            oktw.say(target, message);
            console.log('%s => %s: %s', oktw.nick, target, message);
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

//InitModule
moduleManager.InitModules();

//print log to console and ping
oktw.addListener('message#', function (from, to, message) {
    console.log('%s => %s: %s',from ,to ,message);
    if (message === 'ping') {
        say(from, to, 'pong');
    }else if(message === '.help') {
        say(from, to, '可用指令：' + moduleManager.commands.toString());
    }else if (message.match(/\.[a-z]/i)) {
        args = message.replace('.', '').split(' ');
        moduleManager.commands.forEach(function(cmd) {
            if (cmd === args[0]) {
                moduleManager.modules[cmd](from, to, args);
            }
        })
    }
});
oktw.addListener('pm', function (from, message) {
    console.log('%s => %s: %s',from ,oktw.ncik ,message);
});

//autojoin
oktw.addListener('invite', function(channel, from, message) {
    oktw.join(channel);
});

oktw.addListener('registered', function() {
    console.log('Bot connected!');
});

exports.say = say;
