import * as Discord from 'discord.js';

import { CanAdd, IIcBot, Info } from '../Interfaces';
import { Commands } from '../classes';
import { gccp, Type } from '../util';

export const IcBot = (icModule: IIcBot) => {
    return (target: Type<object>) => {
        let client: Discord.Client = new Discord.Client();

        client.login(icModule.token).then(() => {
            let CanAddName: CanAdd[] = [
                { ref: client, name: "Client" },
                { ref: new IIcBot(icModule.token, icModule.prefix, icModule.commands, icModule.imports, icModule.providers), name: "IIcBot" }
            ];

            let providers: any[] = [];
            let commands: any[] = [];

            if (icModule.commands) {
                icModule.commands.forEach(command => {
                    let Parameters: string[] = gccp(command);
                    let addedParameters: any[] = [];

                    Parameters.forEach(parameter => {
                        let found = CanAddName.find(can => {
                            return can.name == parameter;
                        });

                        if (typeof found !== 'undefined') {
                            addedParameters.push(found.ref);
                        } else {
                            throw new Error(`No provider for ${parameter}!`);
                        }
                    });

                    let commandObj = new (Function.prototype.bind.apply(command, [null].concat(addedParameters)));

                    commands.push(commandObj);
                });

                let cmdNames: Info[] = [];

                commands.forEach(command => {
                    cmdNames.push(command["info"]);
                });

                CanAddName.push({ name: "Commands", ref: { all: cmdNames } });
            }

            if (icModule.imports) {
                icModule.imports.forEach(importClass => {
                    let import_ = new importClass();

                    if (!import_["iicImport"].onlyForBot == true) {
                        import_["iicImport"].providers.forEach((provider: Type<any>, i: number) => {
                            let Parameters: string[] = gccp(provider);
                            let addedParameters: any[] = [];
    
                            Parameters.forEach(parameter => {
                                let found = CanAddName.find(can => {
                                    return can.name == parameter;
                                });
    
                                let found_ = import_["providersParams"].find((can: CanAdd) => {
                                    return can.name == parameter;
                                });
    
                                if (typeof found !== 'undefined') {
                                    addedParameters.push(found.ref);
                                } else if (typeof found_ !== 'undefined') {
                                    addedParameters.push(found_.ref);
                                } else {
                                    throw new Error(`No provider for ${parameter}!`);
                                }
                            });
    
                            let providerObj = new (Function.prototype.bind.apply(provider, [null].concat(addedParameters)))
    
                            providers.push(providerObj);
                            CanAddName.push({ ref: providerObj, name: provider.name });
                        });
    
                        import_["iicImport"].imports.forEach((import__: Type<any>) => {
                            import_["imports"].push(new import__());
                        });
                    }
                });
            }

            if (icModule.providers) {
                icModule.providers.forEach(provider => {
                    let Parameters: string[] = gccp(provider);
                    let addedParameters: any[] = [];

                    Parameters.forEach(parameter => {
                        let found = CanAddName.find(can => {
                            return can.name == parameter;
                        });

                        if (typeof found !== 'undefined') {
                            addedParameters.push(found.ref);
                        } else {
                            throw new Error(`No provider for ${parameter}!`);
                        }
                    });

                    let providerObj = new (Function.prototype.bind.apply(provider, [null].concat(addedParameters)))

                    providers.push(providerObj);
                    CanAddName.push({ ref: providerObj, name: provider.name });
                });
            }

            if (icModule.commands) {
                icModule.commands.forEach((command, i) => {
                    let Parameters: string[] = gccp(command);
                    let addedParameters: any[] = [];

                    Parameters.forEach(parameter => {
                        let found = CanAddName.find(can => {
                            return can.name == parameter;
                        });

                        if (typeof found !== 'undefined') {
                            addedParameters.push(found.ref);
                        } else {
                            throw new Error(`No provider for ${parameter}!`);
                        }
                    });

                    let commandObj = new (Function.prototype.bind.apply(command, [null].concat(addedParameters)));

                    CanAddName.push({ name: command.name, ref: commandObj });
                    commands[i] = commandObj;
                });

                let refI: number = CanAddName.indexOf(CanAddName.find(can => can.name === "Commands"));
                let ref: Info[] = CanAddName[refI].ref.all;

                ref.forEach((info, index) => {
                    info.ref = commands[index];
                });
            }

            if (icModule.imports) {
                icModule.imports.forEach(importClass => {
                    let import_ = new importClass();

                    if (import_["iicImport"].onlyForBot == true) {
                        import_["iicImport"].providers.forEach((provider: Type<any>, i: number) => {
                            let Parameters: string[] = gccp(provider);
                            let addedParameters: any[] = [];
    
                            Parameters.forEach(parameter => {
                                let found = CanAddName.find(can => {
                                    return can.name == parameter;
                                });
    
                                let found_: CanAdd = import_["providersParams"].find((can: CanAdd) => {
                                    return can.name == parameter;
                                });
    
                                if (typeof found !== 'undefined') {
                                    addedParameters.push(found.ref);
                                } else if (typeof found_ !== 'undefined') {
                                    addedParameters.push(found_.ref);
                                } else {
                                    throw new Error(`No provider for ${parameter}!`);
                                }
                            });
    
                            let providerObj = new (Function.prototype.bind.apply(provider, [null].concat(addedParameters)))
    
                            providers.push(providerObj);
                            CanAddName.push({ ref: providerObj, name: provider.name });
                        });
    
                        import_["iicImport"].imports.forEach((import__: Type<any>) => {
                            import_["imports"].push(new import__());
                        });
                    }
                });
            }

            let Parameters: string[] = gccp(target);
            let addedParameters: any[] = [];

            Parameters.forEach(parameter => {
                let found = CanAddName.find(can => {
                    return can.name == parameter;
                });

                if (typeof found !== 'undefined') {
                    addedParameters.push(found.ref);
                } else {
                    throw new Error(`No provider for ${parameter}!`);
                }
            });

            let module: any = new (Function.prototype.bind.apply(target, [null].concat(addedParameters)));

            if (typeof module.icOnReady == 'function') {
                module.icOnReady();
            }

            if (typeof module.icOnMessage == 'function') {
                client.on('message', (message: Discord.Message) => { module.icOnMessage(message); })
            }
        }).catch(err => { throw err; });
    }
}
