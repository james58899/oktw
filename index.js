var express = require('express');
var irc = require('irc');
var fs = require('fs');

var moduleManager = require('./moduleManager');

//Web Servcie Start
var http = express();
http.set('port', (process.env.PORT || 5000));
http.get('*', function (req, res) {
  res.send('Hello World!');
});
http.listen(http.get('port'));

//Start
var oktw = function() {
    console.log('Loading bot...');
    this.irc;
    this.say;
    this.config = {};
    this.admin = [];
    this.cache = [];
    this.ignore = [];

    moduleManager.InitModules();
    this.loadConfig();
    this.start();
};

oktw.prototype.loadConfig = function() {
    this.config = JSON.parse(fs.readFileSync('./data/config.json', 'utf8'));
    this.admin = JSON.parse(fs.readFileSync('./data/admin.json', 'utf8'));
    this.ignore = JSON.parse(fs.readFileSync('./data/ignore.json', 'utf8'));
    console.log('Loaded Config!');
};

oktw.prototype.start = function() {
    this.irc = new irc.Client(this.config.host, this.config.nickname, {
        channels: this.config.channels,
        userName: this.config.username,
        realName: this.config.realname,
        port: this.config.port,
        secure: this.config.secure,
    })
    console.log('Connecting to IRC...')
    this.listener();
};

var delayA = 3;
var delayB = 5;
var delayC;
setInterval(function(){
    if (delayB < 5) {
        delayB++;
    }
}, 1000);
oktw.prototype.say = function (from, target, message) {
    if (delayC === from) {
        delayA--;
    }else{
        delayA = 3;
    }
    if (delayA >0) {
        if (delayB > 0) {
            this.irc.say(target, message);
            console.log('%s => %s: %s', this.irc.nick, target, message);
            delayB--;
        }
    }
    delayC = from;
};

//Command match
oktw.prototype.listener = function() {
    var self = this;

    this.irc.addListener('message#', function (from, to, message) {
        console.log('%s => %s: %s',from ,to ,message);
        if (message === 'ping') {
            self.say(from, to, 'pong');
        }else if(message === '.help') {
            self.say(from, to, '可用指令：' + moduleManager.commands.toString());
        }else if (message.match(/^\.[a-z]/i)) {
            args = message.replace(/^\./, '').split(' ');
            for(var mod in moduleManager.modules) {
                if (args[0].toLowerCase() === moduleManager.modules[mod].info['command']) {
                    self.say(from, to, moduleManager.modules[mod](args));
                }
            }
        }else{
            for(var mod in moduleManager.modules) {
                var i = moduleManager.modules[mod];
                if (i.info['rawCommand'] !== undefined && message.match(i.info['rawCommand'])) {
                    console.log('Bug!');
                    self.say(from, to, i(message.match(i.info['rawCommand']).toString()));
                }
            }
        }
    });
    this.irc.addListener('pm', function (from, message) {
        console.log('%s => %s: %s',from ,oktw.ncik ,message);
    });

    //autojoin
    this.irc.addListener('invite', function(channel, from, message) {
        this.irc.join(channel);
        console.log('Bot was invited to join %s', channel);
    });

    this.irc.addListener('registered', function() {
        console.log('Bot connected!\n');
    });
}

new oktw();
