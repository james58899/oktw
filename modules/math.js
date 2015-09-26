var math = require('mathjs');

module.exports = function (from, to, args) {
    var i = args.join(' ').replace('c ', '');
    /*global oktw*/
    if (typeof math.eval(i) !== 'function') {
        oktw.say(from, to, math.eval(i));
    }
};

module.exports.info = {name:'math', example:'.c 1+1', command:'c'};
