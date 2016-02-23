var TelegramBot = require('node-telegram-bot-api');
var util = require('util');
var imgur = require('imgur');

var tgChatID = -1001033293696;
var token = oktw.config.tgKey;
var tg = new TelegramBot(token, {
    polling: {
        timeout: 5,
        interval: 100
    }
});
imgur.setClientId('41ad90f344bdf2f');

tg.on('message', function(msg) {
    if (msg.chat.id === tgChatID) {
        if (msg.text) {
            console.log('%s => Telegram: %s', msg.from.username, msg.text.replace(/\s/g, ' '));
            var message = msg.text.replace(/\s/g, ' ');
            if (msg.reply_to_message) {
                if(msg.reply_to_message.from.username === 'oktw_bot') {
                    var ReplyUsername = msg.reply_to_message.text.match(/<\S+>/i)[0].match(/[^<>]+/i)[0];
                    message = util.format('<%s>: %s, %s', msg.from.username, ReplyUsername, message);
                }else{
                    message = util.format('<%s>: @%s %s', msg.from.username, msg.reply_to_message.from.username, message);
                }
            }
            else {
                message = util.format('<%s>: %s', msg.from.username, msg.text.replace(/\s/g, ' '));
            }
            /*global oktw*/
            oktw.irc.say('#ysitd', message);
        }
        if (msg.photo) {
            var fileId = msg.photo[msg.photo.length - 1].file_id;
            tg.getFileLink(fileId).then(function(url) {
                imgur.uploadUrl(url).then(function(res) {
                    oktw.irc.say('#ysitd', util.format('<%s>: %s', msg.from.username, res.data.link));
                }).catch(function (err) {
                    console.error(err.message);
                });
            });
        }
        if (msg.caption) {
            console.log('%s => Telegram: %s', msg.from.username, msg.caption.replace(/\s/g, ' '));
            oktw.irc.say('#ysitd', util.format('<%s>: %s', msg.from.username, msg.caption.replace(/\s/g, ' ')));
        }
        if (msg.sticker) {
            tg.getFileLink(msg.sticker.file_id).then(function(url) {
                imgur.uploadUrl(url).then(function(res) {
                    oktw.irc.say('#ysitd', util.format('<%s>: %s', msg.from.username, res.data.link));
                }).catch(function (err) {
                    console.error(err.message);
                });
            });
        }
    }
});

module.exports = function(from, to, message) {
    if (to === '#ysitd') {
        tg.sendMessage(tgChatID, util.format('<%s>: %s', from, message.toString().replace(/((?:\u0003\d\d?,\d\d?|\u0003\d\d?|\u0002|\u001d|\u000f|\u0016|\u001f))/g, '')));
    }
};

oktw.irc.on('action', function(from, to, text) {
    if (to === '#ysitd') {
        tg.sendMessage(tgChatID, util.format('<%s>: /me %s', from, text.toString().replace(/((?:\u0003\d\d?,\d\d?|\u0003\d\d?|\u0002|\u001d|\u000f|\u0016|\u001f))/g, '')));
    }
});

module.exports.info = {
    name: 'telegram',
    rawcommand: /.*/
};
