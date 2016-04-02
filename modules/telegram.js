var TelegramBot = require('node-telegram-bot-api');
var util = require('util');
var imgur = require('imgur');
var Pastee = require('pastee');

var tgChatID = oktw.config.telegram.chatId;
var token = oktw.config.telegram.key;
var ircChannel = oktw.config.telegram.channel;
var username;
imgur.setClientId('41ad90f344bdf2f');

var paste = new Pastee();
var tg = new TelegramBot(token, {
    polling: {
        interval: 100
    }
});

tg.getMe().then(function(me) {
    username = me.username;
});

tg.on('message', function(msg) {
    if (msg.chat.id === tgChatID) {
        var sendToIrc = function(message) {
            if (msg.reply_to_message) {
                if (msg.reply_to_message.text) {
                    if (msg.reply_to_message.from.username === username) {
                        var ReplyUsername = msg.reply_to_message.text.match(/<\S+>/i)[0].match(/[^<>]+/i)[0];
                        var ShortMessage;
                        if (msg.reply_to_message.text.replace(/^<\S+>: /i, '').length > 5) {
                            ShortMessage = msg.reply_to_message.text.replace(/^<\S+>: /i, '').slice(0, 4) + '...';
                        }
                        else {
                            ShortMessage = msg.reply_to_message.text.replace(/^<\S+>: /i, '');
                        }
                        console.log('%s => Telegram: (%s: %s) %s', msg.from.username, ReplyUsername, ShortMessage, message);
                        message = util.format('<%s>: (%s: %s) %s', msg.from.username, ReplyUsername, ShortMessage, message);
                    }
                    else {
                        var ShortMessage;
                        if (msg.reply_to_message.text.length > 5) {
                            ShortMessage = msg.reply_to_message.text.slice(0, 4) + '...';
                        }
                        else {
                            ShortMessage = msg.reply_to_message.text;
                        }
                        console.log('%s => Telegram: (@%s: %s) %s', msg.from.username, msg.reply_to_message.from.username, ShortMessage, message);
                        message = util.format('<%s>: (@%s: %s) %s', msg.from.username, msg.reply_to_message.from.username, ShortMessage, message);
                    }
                }
                else {
                    if (msg.reply_to_message.from.username === username) {
                        var ReplyUsername = msg.reply_to_message.text.match(/<\S+>/i)[0].match(/[^<>]+/i)[0];
                        console.log('%s => Telegram: (reply %s) %s', msg.from.username, ReplyUsername, message);
                        message = util.format('<%s>: (reply %s) %s', msg.from.username, ReplyUsername, message);
                    }
                    else {
                        console.log('%s => Telegram: (reply @%s) %s', msg.from.username, msg.reply_to_message.from.username, message);
                        message = util.format('<%s>: (reply @%s) %s', msg.from.username, msg.reply_to_message.from.username, message);
                    }
                }
            }
            else {
                console.log('%s => Telegram: %s', msg.from.username, message);
                message = util.format('<%s>: %s', msg.from.username, message);
            }
            /*global oktw*/
            oktw.irc.say(ircChannel, message);
        };
        if (msg.text) {
            if (Buffer.byteLength(msg.text, 'utf8') > 300) {
                paste.paste(msg.text, function(err, res) {
                    sendToIrc(res.raw);
                    if (err) {
                        console.log(err);
                    }
                });
            }
            else {
                sendToIrc(msg.text.replace(/\s/g, ' '));
            }
        }
        if (msg.photo) {
            var fileId = msg.photo[msg.photo.length - 1].file_id;
            tg.getFileLink(fileId).then(function(url) {
                imgur.uploadUrl(url).then(function(res) {
                    sendToIrc(res.data.link);
                }).catch(function(err) {
                    console.error(err.message);
                });
            });
        }
        if (msg.caption) {
            sendToIrc(msg.caption.replace(/\s/g, ' '));
        }
        if (msg.sticker) {
            tg.getFileLink(msg.sticker.file_id).then(function(url) {
                imgur.uploadUrl(url).then(function(res) {
                    sendToIrc(res.data.link);
                }).catch(function(err) {
                    console.error(err.message);
                });
            });
        }
    }
});

module.exports = function(from, to, message) {
    if (to === ircChannel) {
        tg.sendMessage(tgChatID, util.format('<%s>: %s', from, message.toString().replace(/((?:\u0003\d\d?,\d\d?|\u0003\d\d?|\u0002|\u001d|\u000f|\u0016|\u001f))/g, '')));
    }
};

oktw.irc.on('action', function(from, to, text) {
    if (to === ircChannel) {
        tg.sendMessage(tgChatID, util.format('<%s>: /me %s', from, text.toString().replace(/((?:\u0003\d\d?,\d\d?|\u0003\d\d?|\u0002|\u001d|\u000f|\u0016|\u001f))/g, '')));
    }
});

module.exports.info = {
    name: 'telegram',
    rawcommand: /.*/
};
