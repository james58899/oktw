module.exports = function (from, to, args, callback) {
    console.log(from, to, 'Hello World!');
    console.log(callback);
    callback(from, to, 'Hello World!');
};

module.exports.info = {name:'test', help:'A Test Command!', command:'test'};
