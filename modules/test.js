module.exports = function (from, to, args) {
    /*global oktw*/
    oktw.say(from, to, 'Hello World!');
};

module.exports.info = {name:'test', command:'test'};
