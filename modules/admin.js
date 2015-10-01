var fs = require('fs');

module.exports = function (from, to, args) {
    /*global oktw*/
    oktw.checkAdmin(from, function(admin) {
        if (!admin) {
            oktw.say(from, to, '管理員指令！');
            return;
        }
        switch(args[1]) {
            case 'op':
                if(oktw.admin.indexOf(args[2]) < 0){
                    oktw.admin.push(args[2]);
                    fs.writeFile('./data/admin.json', JSON.stringify(oktw.admin), function(err) {
                        if (err) throw err;
                        oktw.say(from, to, args[2] + ' 設為管理員！');
                    })
                }else{
                    oktw.say(from, to, args[2] + ' 已經是管理員了');
                }
                break;
            case 'deop':
                if(oktw.admin.indexOf(args[2]) > -1) {
                    oktw.admin.splice(oktw.admin.indexOf(args[2]), 1);
                    fs.writeFile('./data/admin.json', JSON.stringify(oktw.admin), function(err) {
                        if (err) throw err;
                        oktw.say(from, to, '取消 ' + args[2] + ' 的管理員權限！');
                    })
                }else{
                    oktw.say(from, to, args[2] + ' 不是管理員');
                }
                break;
            case 'ban':
                if(oktw.ignore.indexOf(args[2]) < 0) {
                    oktw.ignore.push(args[2]);
                    fs.writeFile('./data/ignore.json', JSON.stringify(oktw.ignore), function(err) {
                        if (err) throw err;
                        oktw.say(from, to, '忽略 ' + args[2]);
                    })
                }else{
                    oktw.say(from, to, args[2] + ' 已在忽略名單中');
                }
                break;
            case 'unban':
                if(oktw.ignore.indexOf(args[2]) > -1){
                    oktw.ignore.splice(oktw.ignore.indexOf(args[2]), 1);
                    fs.writeFile('./data/ignore.json', JSON.stringify(oktw.ignore), function(err) {
                        if (err) throw err;
                        oktw.say(from, to, '取消忽略 ' + args[2]);
                    })
                }else{
                    oktw.say(from, to, args[2] + ' 沒有被忽略');
                }
                break;
            case 'reload':
                oktw.reload();
                oktw.say(from, to, '重新載入完成！');
                break;
            case 'stop':
                oktw.say(from, to, '停止中！');
                oktw.stop();
        }
    });
};

module.exports.info = {name:'admin', example:'.admin op/deop/ban/unban/reload/stop', command:'admin'};
