module.exports = function (args) {
    return args.toString().replace('say,', '').replace(',', ' ').replace();
};

module.exports.info = {name:'say', help:'Speak with bot', command:'say'};
