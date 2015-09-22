module.exports = function (from, to, args) {
    say(from, to, 'Hello World!');
}

module.exports.init = {name:'test', help:'A Test Command!'}
