module.exports = function (from, to, args) {
    /*global oktw*/
    if (args.length > 1) {
        if (Object.keys(oktw.irc.chans).indexOf(args[1]) > -1) {
            var chan = args[1];
            var args = args.slice(2);
            oktw.say(from, chan, unescape('\u0001ACTION ' + args.join(' ') + '\u0001'));
        }else{
            oktw.say(from, to, unescape('\u0001ACTION ' + args.slice(1).join(' ') + '\u0001'));
        }
    }
};

module.exports.info = {name:'action', example:'.me Hi or .me #oktw Hinpm vs', command:'me'};
