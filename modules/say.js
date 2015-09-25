module.exports = function (from, to, args) {
    if (args.length > 1) {
        oktw.say(from, to, args.join(' ').replace('say ', '').replace());
    }
};

module.exports.info = {name:'say', help:'Speak with bot', command:'say'};
