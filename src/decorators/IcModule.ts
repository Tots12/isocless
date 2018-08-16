import * as Discord from 'discord.js';

import { CanAdd, IIcModule, Info } from '../Interfaces';
import { CommandsManager, Commands } from '../classes';
import { gccp, Type } from '../util';

export const IcModule = (icModule: IIcModule) => {
    return (target: Type<object>) => {
        let client: Discord.Client = new Discord.Client();

        client.login(icModule.token).then(() => {
            let CanAddName: CanAdd[] = [
                { ref: client, name: "Client" }
            ];

            let providers: any[] = [];
            let commands: any[] = [];

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

            let cmdNames: Info[] = [];

            icModule.commands.forEach(command => {
                cmdNames.push(command.info);
            });

            CanAddName.push({ name: "Commands", ref: new Commands(cmdNames) });

            icModule.commands.forEach(command => {
                let Parameters: string[] = gccp(command.comp);
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

                let commandObj = new (Function.prototype.bind.apply(command.comp, [null].concat(addedParameters)));

                commands.push(commandObj);
                CanAddName.push({ ref: commandObj, name: command.comp.name });
            });

            if (icModule.options.useCommandsManager == true) {
                let cNames: string[] = [];

                icModule.commands.forEach(command => {
                    cNames.push(command.info.name);
                });

                CanAddName.push({ ref: new CommandsManager(client, commands, cNames, icModule), name: "CommandsManager" });
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
