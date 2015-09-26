module.exports = function (from, to, args) {
    if (args.length > 1) {
        /*global oktw*/
        oktw.say(from, to, args.join(' ').replace('say ', ''));
    }
};

module.exports.info = {name:'say', example:'.say Hello World!', command:'say'};
