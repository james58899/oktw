module.exports = function (from, to, args) {
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
                oktw.admin.indexOf(args[2]) > -1 && oktw.admins.splice(oktw.admin.indexOf(args[2]), 1);
                oktw.say(from, to, 'User ' + args[2] + ' is no longer an operator.');
                break;
            case 'ban':
                oktw.ignore.push(args[2]);
                oktw.say(from, to, 'Banned ' + args[2]);
                break;
            case 'unban':
                if(oktw.ignore.indexOf(args[2]) > -1){
                    oktw.ignore.splice(oktw.ignore.indexOf(args[2]), 1);
                }
                oktw.say(from, to, 'Unbanned ' + args[2]);
                break;
        }
    })
};

module.exports.info = {name:'admin', help:'Admin Command!', command:'admin'};
