var TelegramBot = require('node-telegram-bot-api');
var util = require('util');
var imgur = require('imgur');

var tgChatID = -35087073;
var token = '165999018:AAGmDVig2IDY7lmiwUMnW2VgR53PUNEGwVU';
var tg = new TelegramBot(token, {
    polling: {
        timeout: 5,
        interval: 500
    }
});
imgur.setClientId('32cd79f0cb986fc');

tg.on('message', function(msg) {
    if (msg.chat.id === tgChatID) {
        if (msg.text) {
            console.log('%s => Telegram: %s', msg.from.username, msg.text.replace(/\s/g, ' '));
            var message;
            if (msg.reply_to_message) {
                message = util.format('<%s>: @%s %s', msg.from.username, msg.reply_to_message.from.username, msg.text.replace(/\s/g, ' '));
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
                });
            });
        }
        if (msg.caption) {
            oktw.irc.say('#ysitd', util.format('<%s>: %s', msg.from.username, msg.caption));
        }
    }
});

module.exports = function(from, to, message) {
    if (to === '#ysitd') {
        tg.sendMessage(tgChatID, util.format('<%s>: %s', from, message));
    }
};
module.exports.info = {
    name: 'telegram',
    rawcommand: /.*/
};
