module.exports = function (from, to, args) {
    if (args.length > 1) {
        /*global oktw*/
        oktw.say(from, to, unescape('\u0001ACTION ' + args.join(' ').replace('me ', '') + '\u0001'));
    }
};

module.exports.info = {name:'me', example:'.me Hi', command:'me'};
