import * as Discord from 'discord.js';

import { CanAdd, IIcBot, Info } from '../Interfaces';
import { CommandsManager, Commands } from '../classes';
import { gccp, Type } from '../util';

export const IcBot = (icModule: IIcBot) => {
    return (target: Type<object>) => {
        let client: Discord.Client = new Discord.Client();

        client.login(icModule.token).then(() => {
            let CanAddName: CanAdd[] = [
                { ref: client, name: "Client" }
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
                            addedParameters.push(undefined);
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

                    import_["iicImport"].providers.forEach((provider: Type<any>) => {
                        let Parameters: string[] = gccp(provider);
                        let addedParameters: any[] = [];

                        Parameters.forEach(parameter => {
                            let found = CanAddName.find(can => {
                                return can.name == parameter;
                            });

                            if (typeof found !== 'undefined') {
                                addedParameters.push(found.ref);
                            } else {
                                addedParameters.push(undefined);
                            }
                        });

                        let providerObj = new (Function.prototype.bind.apply(provider, [null].concat(addedParameters)))

                        providers.push(providerObj);
                        CanAddName.push({ ref: providerObj, name: provider.name });
                    });

                    import_["iicImport"].imports.forEach((import__: Type<any>) => {
                        import_["imports"].push(new import__());
                    });
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
                            addedParameters.push(undefined);
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
                            addedParameters.push(undefined);
                        }
                    });

                    if (commands[i]["isHelpCommand"] == true) {
                        let commandObj = new (Function.prototype.bind.apply(command, [null].concat(addedParameters)));

                        CanAddName.push({ name: command.name, ref: commandObj });
                        commands[i] = commandObj;
                    }
                });
            }

            let cNames: string[] = [];

            commands.forEach(command => {
                cNames.push(command["info"].name);
            });

            CanAddName.push({ ref: new CommandsManager(client, commands, cNames, icModule), name: "CommandsManager" });


            let Parameters: string[] = gccp(target);
            let addedParameters: any[] = [];

            Parameters.forEach(parameter => {
                let found = CanAddName.find(can => {
                    return can.name == parameter;
                });

                if (typeof found !== 'undefined') {
                    addedParameters.push(found.ref);
                } else {
                    addedParameters.push(undefined);
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
