var TelegramBot = require('node-telegram-bot-api');
var util = require('util');
var request = require('request');
var imgur = require('imgur-node-api')

var token = '165999018:AAGmDVig2IDY7lmiwUMnW2VgR53PUNEGwVU';
var tg = new TelegramBot(token, {polling: true});
imgur.setClientID('32cd79f0cb986fc');

tg.on('message', function (msg) {
    if(msg.text) {
        /*global oktw*/
        oktw.irc.say('#ysitd', util.format('<%s>: %s', msg.from.username, msg.text));
    }
    if(msg.photo) {
        var file = msg.photo[msg.photo.length-1].file_id;
        request('https://api.telegram.org/bot' + token + '/getFile?file_id=' + file,function(error, response, body){
            if (!error && response.statusCode == 200) {
                var json=JSON.parse(body);
                imgur.upload('https://api.telegram.org/file/bot'+token+'/'+json.result.file_path,function(err,res){
                    if(!err){
                        oktw.irc.say('#ysitd', res.data.link);
                    }
                });
            }
        });
    }
});

module.exports = function(from, to, message) {
    tg.sendMessage(-35087073, util.format('<%s>: %s', from, message));
};
module.exports.info = {name:'telegram', rawcommand:/.*/};
