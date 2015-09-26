var math = require('mathjs');

module.exports = function (from, to, args) {
    var i = args.join(' ').replace('c ', '');
    /*global oktw*/
    console.log(math.eval(i), typeof math.eval(i));
    if (typeof math.eval(i) === 'number') {
        oktw.say(from, to, math.eval(i));
    }
};

module.exports.info = {name:'math', example:'.c 1+1', command:'c'};
