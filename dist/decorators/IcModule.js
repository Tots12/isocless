"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
require("reflect-metadata");
class CommandsManager {
    constructor(client, commandsRef, commandsNames, icModule) {
        this.client = client;
        this.commandsRef = commandsRef;
        this.commandsNames = commandsNames;
        this.icModule = icModule;
    }
    run(message) {
        if (this.icModule.options.botUseCommands == false && message.author.id === this.client.user.id)
            return;
        if (!message.content.includes(this.icModule.prefix))
            return;
        let args = message.content
            .substring(this.icModule.prefix.length)
            .split(" ");
        if (this.commandsNames.length < 1 || typeof this.commandsNames == 'undefined')
            return;
        this.commandsNames.forEach((command, i) => {
            if (args[0] === command) {
                this.commandsRef[i].icRun(message, args.splice(0, 1));
            }
        });
    }
}
exports.CommandsManager = CommandsManager;
function getClassConstructorParameters(t) {
    let params = Reflect.getMetadata('design:paramtypes', t);
    if (params) {
        params.forEach((param, i) => {
            params[i] = param.toString()
                .split("{")[0]
                .split(" ")[1];
            if (params[i].includes("(") && params[i].includes(")")) {
                params[i] = param.toString()
                    .split("(")[0]
                    .split("function ")[1];
            }
        });
    }
    return params;
}
exports.IcModule = (icModule) => {
    return (target) => {
        let client = new Discord.Client();
        client.login(icModule.token).then(() => {
            let CanAddName = [
                { ref: client, name: "Client" }
            ];
            let providers = [];
            let commands = [];
            icModule.providers.forEach(provider => {
                if (provider) {
                    let Parameters = getClassConstructorParameters(provider);
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
                }
            });
            let cmdNames = [];
            icModule.commands.forEach(command => {
                cmdNames.push(command.info.name);
            });
            CanAddName.push({ name: "Commands", ref: cmdNames });
            icModule.commands.forEach(command => {
                if (command) {
                    let Parameters = getClassConstructorParameters(command.comp);
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
                    let commandObj = new (Function.prototype.bind.apply(command.comp, [null].concat(addedParameters)));
                    commands.push(commandObj);
                    CanAddName.push({ ref: commandObj, name: command.comp.name });
                }
            });
            if (icModule.options.useCommandsManager == true) {
                let cNames = [];
                icModule.commands.forEach(command => {
                    cNames.push(command.info.name);
                });
                CanAddName.push({ ref: new CommandsManager(client, commands, cNames, icModule), name: "CommandsManager" });
            }
            let Parameters = getClassConstructorParameters(target);
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
