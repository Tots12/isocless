"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Discord = require("discord.js");
const Interfaces_1 = require("../Interfaces");
const util_1 = require("../util");
exports.IcBot = (icModule) => {
    return (target) => {
        let client = new Discord.Client();
        client.login(icModule.token).then(() => {
            let CanAddName = [
                { ref: client, name: "Client" },
                { ref: new Interfaces_1.IIcBot(icModule.token, icModule.prefix, icModule.commands, icModule.imports, icModule.providers), name: "IIcBot" }
            ];
            let providers = [];
            let commands = [];
            if (icModule.commands) {
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
            }
            if (icModule.imports) {
                icModule.imports.forEach(importClass => {
                    let import_ = new importClass();
                    if (!import_["iicImport"].onlyForBot == true) {
                        import_["iicImport"].providers.forEach((provider, i) => {
                            let Parameters = util_1.gccp(provider);
                            let addedParameters = [];
                            Parameters.forEach(parameter => {
                                let found = CanAddName.find(can => {
                                    return can.name == parameter;
                                });
                                let found_ = import_["providersParams"].find((can) => {
                                    return can.name == parameter;
                                });
                                if (typeof found !== 'undefined') {
                                    addedParameters.push(found.ref);
                                }
                                else if (typeof found_ !== 'undefined') {
                                    addedParameters.push(found_.ref);
                                }
                                else {
                                    addedParameters.push(undefined);
                                }
                            });
                            let providerObj = new (Function.prototype.bind.apply(provider, [null].concat(addedParameters)));
                            providers.push(providerObj);
                            CanAddName.push({ ref: providerObj, name: provider.name });
                        });
                        import_["iicImport"].imports.forEach((import__) => {
                            import_["imports"].push(new import__());
                        });
                    }
                });
            }
            if (icModule.providers) {
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
            }
            if (icModule.commands) {
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
                    let commandObj = new (Function.prototype.bind.apply(command, [null].concat(addedParameters)));
                    CanAddName.push({ name: command.name, ref: commandObj });
                    commands[i] = commandObj;
                });
                let refI = CanAddName.indexOf(CanAddName.find(can => can.name === "Commands"));
                let ref = CanAddName[refI].ref.all;
                ref.forEach((info, index) => {
                    info.ref = commands[index];
                });
            }
            if (icModule.imports) {
                icModule.imports.forEach(importClass => {
                    let import_ = new importClass();
                    if (import_["iicImport"].onlyForBot == true) {
                        import_["iicImport"].providers.forEach((provider, i) => {
                            let Parameters = util_1.gccp(provider);
                            let addedParameters = [];
                            Parameters.forEach(parameter => {
                                let found = CanAddName.find(can => {
                                    return can.name == parameter;
                                });
                                let found_ = import_["providersParams"].find((can) => {
                                    return can.name == parameter;
                                });
                                if (typeof found !== 'undefined') {
                                    addedParameters.push(found.ref);
                                }
                                else if (typeof found_ !== 'undefined') {
                                    addedParameters.push(found_.ref);
                                }
                                else {
                                    addedParameters.push(undefined);
                                }
                            });
                            let providerObj = new (Function.prototype.bind.apply(provider, [null].concat(addedParameters)));
                            providers.push(providerObj);
                            CanAddName.push({ ref: providerObj, name: provider.name });
                        });
                        import_["iicImport"].imports.forEach((import__) => {
                            import_["imports"].push(new import__());
                        });
                    }
                });
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
