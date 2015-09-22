var fs = require('fs');
var commands = [];
var modules = [];

function InitModules() {
    console.log('Loading modules...')
    fs.readdir('modules', function(err, files) {
        for(var i = 0; i < files.length; i++) {
            Loader(files[i]);
            }
    })
}

function Loader(filename) {
    mod = require('./modules/' + filename);
    modules[mod.init['name']] = mod;
    commands.push(mod.init['name']);
    console.log('Loaded %s !', mod.init['name']);
}

exports.InitModules = InitModules;
exports.modules = modules;
exports.commands = commands;
