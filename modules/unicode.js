module.exports = function (from, to, args) {
    if (args[1].match(/^\\u/)) {
        /*global oktw*/
        oktw.say(from, to, unescape(args[1].match(/\\u[a-z0-9]{4}/i).toString().replace(/\\u/i,"%u")));
    }else{
        oktw.say(from, to, '\\u' + ('00' + args[1].charCodeAt(0).toString(16)).slice(-4));
    }
};

module.exports.info = {name:'unicode', example:'.u §', command:'u'};
