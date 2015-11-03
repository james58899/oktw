var fs = require('fs');
var commands = [];
var modules = [];

function InitModules() {
    console.log('Loading modules...');
    fs.readdir('modules', function(err, files) {
        if (err) throw err;
        for(var i = 0; i < files.length; i++) {
            Loader(files[i]);
            }
    });
}

function Loader(filename) {
    var mod = require('./modules/' + filename);
    modules[mod.info['name']] = mod;
    if(mod.info['commanda']) {
        commands.push(mod.info['command']);
    }
    console.log('Loaded module %s(%s) !', mod.info['name'], filename);
}

function Unload() {
    modules = [];
    commands = [];
    console.log('All Unloaded!');
}

exports.InitModules = InitModules;
exports.Unload = Unload;
exports.commands = commands;
exports.modules = modules;
