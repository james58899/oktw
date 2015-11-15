var express = require('express');
var irc = require('irc');
var fs = require('fs');

//Web Servcie Start
var http = express();
http.set('port', (process.env.PORT || 5000));
http.get('*', function(req, res) {
    res.send('Hello World!');
});
http.listen(http.get('port'));

//Start
var oktw = function() {
    console.log('Loading bot...');
    this.delayA = 5;
    this.delayB = 5;
    this.delayC;
    this.irc;
    this.say;
    this.config = {};
    this.admin = [];
    this.ignore = [];

    this.mm.InitModules();
    this.loadConfig();
    this.start();
};

oktw.prototype.mm = require('./moduleManager');

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
    });
    console.log('Connecting to IRC...');
    this.listener();
};

oktw.prototype.reload = function() {
    this.mm.Unload();
    this.mm.InitModules();
};

oktw.prototype.stop = function() {
    this.mm.Unload();
    this.irc.disconnect('Bot Stoping!');
    process.exit();
};

setInterval(function() {
    if (global.oktw.delayB < 5) {
        global.oktw.delayB++;
    }
}, 1000);
oktw.prototype.say = function(from, target, message) {
    if (this.delayC === from) {
        this.delayA--;
    }
    else {
        this.delayA = 5;
    }
    if (this.delayA > 0 && this.delayB > 0) {
        this.irc.say(target, message);
        console.log('%s => %s: %s', this.irc.nick, target, message);
        this.delayB--;
    }
    this.delayC = from;
};

oktw.prototype.checkAdmin = function(nick, callback) {
    var self = this;
    this.irc.whois(nick, function(data) {
        if (typeof data.account !== "undefined" && self.admin.indexOf(data.account) > -1) {
            callback(true);
        }
        else {
            callback(false);
        }
    });
};

oktw.prototype.checkIgnore = function(nick) {
    var result = true;
    this.ignore.forEach(function(ignore) {
        if (nick.match(new RegExp(ignore, 'gi'))) {
            result = false;
        }
    });
    return result;
};

//Command match
oktw.prototype.listener = function() {
    var self = this;

    this.irc.addListener('message#', function(from, to, message) {
        console.log('%s => %s: %s', from, to, message);
        if (self.checkIgnore(from)) {
            if (message === 'ping') {
                self.say(from, to, 'pong');
            }
            else if (message === '.help') {
                self.say(from, to, '可用指令：' + self.mm.commands.join(', '));
            }
        }
    });

    this.irc.addListener('message#', function(from, to, message) {
        if (self.checkIgnore(from)) {
            if (message.match(/^\.[a-z]/i)) {
                var args = message.replace(/^\./, '').split(' ');
                for (var mod in self.mm.modules) {
                    var i = self.mm.modules[mod];
                    if (args[0].toLowerCase() === i.info['command']) {
                        if (args.length === 1 && i.info['example'] !== undefined) {
                            self.say(from, to, i.info['name'] + '\nExample: ' + i.info['example']);
                        }
                        else {
                            i(from, to, args);
                            break;
                        }
                    }
                }
            }
            else {
                for (var mod in self.mm.modules) {
                    var i = self.mm.modules[mod];
                    if (i.info['rawcommand'] !== undefined && message.match(i.info['rawcommand'])) {
                        i(from, to, message.match(i.info['rawcommand']));
                    }
                }
            }
        }
    });

    this.irc.addListener('pm', function(from, message) {
        console.log('%s => %s: %s', from, oktw.ncik, message);
    });

    //autojoin
    this.irc.addListener('invite', function(channel, from, message) {
        self.irc.join(channel);
        console.log('Bot was invited to join %s', channel);
    });

    this.irc.addListener('registered', function() {
        console.log('Bot connected!\n');
    });
};

global.oktw = new oktw();

process.on('uncaughtException', function(ex) {
    console.log(ex.stack);
});
