module.exports = function (from, to, args) {
    /*global oktw*/
    if (args.length > 1) {
        if (Object.keys(oktw.irc.chans).indexOf(args[1]) > -1) {
            var chan = args[1];
            var args = args.slice(2);
            oktw.say(from, chan, args.join(' '));
        }else{
            oktw.say(from, to, args.slice(1).join(' '));
        }
    }
};

module.exports.info = {name:'say', example:'.say Hello World! or .say #oktw Hello World!', command:'say'};
