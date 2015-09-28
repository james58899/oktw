var wolfram = require('wolfram').createClient('X5YPQ5-Y4QGQ5EGPE')

module.exports = function (from, to, args) {
    var i = args.join(' ').replace('wolfram ', '');
    wolfram.query(i, function(err, result) {
        if(err) throw err
        /*global oktw*/
        console.log(result[1].subpods[0].value);
        oktw.say(from, to, result[1].subpods[0].value.slice(0,450));
    })
};

module.exports.info = {name:'wolfram', example:'.wolfram 1+1', command:'wolfram'};
