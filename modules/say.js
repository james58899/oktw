module.exports = function (from, to, args) {
    if (args.length > 1) {
        oktw.say(from, to, args.toString().replace('say,', '').replace(',', ' ').replace());
    }
};

module.exports.info = {name:'say', help:'Speak with bot', command:'say'};
