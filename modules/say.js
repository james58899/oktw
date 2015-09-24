module.exports = function (from, to, args, callback) {
    callback(from, to, args.toString().replace('say,', '').replace(',', ' ').replace());
};

module.exports.info = {name:'say', help:'Speak with bot', command:'say'};
