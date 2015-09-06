var fs = require('fs');

function InitModules() {
    fs.readdir('modules', function(err, files) {
        for(var i = 0; i < files.length; i++) {
            Loader(files[i]);
            console.log('loaded ' + files[i])
            }
    })
}

function Loader(filename) {
    require('./modules/' + filename);
}

exports.InitModules = InitModules;
