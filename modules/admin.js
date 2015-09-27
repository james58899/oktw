module.exports = function (from, to, args) {
    /*global oktw*/
    oktw.checkAdmin(from, function(admin) {
        if (!admin) {
            oktw.say(from, to, 'Admin only!');
            return;
        }
        switch(args[1]) {
            case 'op':
                if(oktw.admin.indexOf(args[2]) < 0){
                    oktw.admin.push(args[2]);
                        oktw.say(from, to, 'Successfully!');
                }
                else {
                    oktw.say(from, to, 'User ' + args[2] + ' is already an operator.');
                }
                break;
            case 'deop':
                oktw.admin.indexOf(args[2]) > -1 && oktw.admin.splice(oktw.admin.indexOf(args[2]), 1);
                oktw.say(from, to, 'Deopped ' + args[2]);
                break;
            case 'ban':
                oktw.ignore.push('^' + args[2]);
                oktw.say(from, to, 'Banned ' + args[2]);
                break;
            case 'unban':
                if(oktw.ignore.indexOf(args[2]) > -1){
                    oktw.ignore.splice(oktw.ignore.indexOf(args[2]), 1);
                }
                oktw.say(from, to, 'Unbanned ' + args[2]);
                break;
            case 'reload':
                oktw.reload();
                oktw.say(from, to, 'Bot reloaded!');
                break;
            case 'stop':
                oktw.say(from, to, 'Stopping!');
                oktw.stop();
        }
    });
};

module.exports.info = {name:'admin', example:'.admin op/deop/ban/unban/reload/stop', command:'admin'};
