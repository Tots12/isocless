"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const classes_1 = require("../classes");
const util_1 = require("../util");
exports.IcBot = (icModule) => {
    return (target) => {
        let client = new Discord.Client();
        client.login(icModule.token).then(() => {
            let CanAddName = [
                { ref: client, name: "Client" }
            ];
            let providers = [];
            let commands = [];
            icModule.providers.forEach(provider => {
                let Parameters = util_1.gccp(provider);
                let addedParameters = [];
                Parameters.forEach(parameter => {
                    let found = CanAddName.find(can => {
                        return can.name == parameter;
                    });
                    if (typeof found !== 'undefined') {
                        addedParameters.push(found.ref);
                    }
                    else {
                        addedParameters.push(undefined);
                    }
                });
                let providerObj = new (Function.prototype.bind.apply(provider, [null].concat(addedParameters)));
                providers.push(providerObj);
                CanAddName.push({ ref: providerObj, name: provider.name });
            });
            icModule.commands.forEach(command => {
                let Parameters = util_1.gccp(command);
                let addedParameters = [];
                Parameters.forEach(parameter => {
                    let found = CanAddName.find(can => {
                        return can.name == parameter;
                    });
                    if (typeof found !== 'undefined') {
                        addedParameters.push(found.ref);
                    }
                    else {
                        addedParameters.push(undefined);
                    }
                });
                let commandObj = new (Function.prototype.bind.apply(command, [null].concat(addedParameters)));
                commands.push(commandObj);
            });
            let cmdNames = [];
            commands.forEach(command => {
                cmdNames.push(command["info"]);
            });
            CanAddName.push({ name: "Commands", ref: { all: cmdNames } });
            icModule.commands.forEach((command, i) => {
                let Parameters = util_1.gccp(command);
                let addedParameters = [];
                Parameters.forEach(parameter => {
                    let found = CanAddName.find(can => {
                        return can.name == parameter;
                    });
                    if (typeof found !== 'undefined') {
                        addedParameters.push(found.ref);
                    }
                    else {
                        addedParameters.push(undefined);
                    }
                });
                if (commands[i]["isHelpCommand"] == true) {
                    let commandObj = new (Function.prototype.bind.apply(command, [null].concat(addedParameters)));
                    CanAddName.push({ name: command.name, ref: commandObj });
                    commands[i] = commandObj;
                }
            });
            if (icModule.options.useCommandsManager == true) {
                let cNames = [];
                commands.forEach(command => {
                    cNames.push(command["info"].name);
                });
                CanAddName.push({ ref: new classes_1.CommandsManager(client, commands, cNames, icModule), name: "CommandsManager" });
            }
            let Parameters = util_1.gccp(target);
            let addedParameters = [];
            Parameters.forEach(parameter => {
                let found = CanAddName.find(can => {
                    return can.name == parameter;
                });
                if (typeof found !== 'undefined') {
                    addedParameters.push(found.ref);
                }
                else {
                    addedParameters.push(undefined);
                }
            });
            let module = new (Function.prototype.bind.apply(target, [null].concat(addedParameters)));
            if (typeof module.icOnReady == 'function') {
                module.icOnReady();
            }
            if (typeof module.icOnMessage == 'function') {
                client.on('message', (message) => { module.icOnMessage(message); });
            }
        }).catch(err => { throw err; });
    };
};
