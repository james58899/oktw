module.exports = function (from, to, args) {
    oktw.say(from, to, 'Hello World!');
};

module.exports.info = {name:'test', help:'A Test Command!', command:'test'};
