import * as Discord from 'discord.js';
import 'reflect-metadata';

import { CanAdd } from '../Interfaces';
import { Type } from './type';

export interface Command {
    info: { name: string; };
    comp: Type<any>;
}

export interface IcModule {
    commands: Command[];
    providers: Type<any>[];
    token: string;
    prefix: string;
    options: { useCommandsManager: boolean; botUseCommands: boolean };
}

export class CommandsManager {
    constructor(
        private client: Discord.Client,
        private commandsRef: any[],
        private commandsNames: string[],
        private icModule: IcModule
    ) { }

    run(message: Discord.Message) {
        if (this.icModule.options.botUseCommands == false && message.author.id === this.client.user.id) return;

        if (!message.content.includes(this.icModule.prefix)) return;

        let args: string[] = message.content
            .substring(this.icModule.prefix.length)
            .split(" ");

        if (this.commandsNames.length < 1 || typeof this.commandsNames == 'undefined') return;

        this.commandsNames.forEach((command, i) => {
            if (args[0] === command) {
                this.commandsRef[i].icRun(message, args.splice(0, 1));
            }
        });
    }
}

function getClassConstructorParameters(t: object): string[] {
    let params: string[] = Reflect.getMetadata('design:paramtypes', t);

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

    return params;
}

export class Commands {
    constructor(
        public all: string[]
    ) { }
}

export const IcModule = (icModule: IcModule) => {
    return (target: Type<object>) => {
        let client: Discord.Client = new Discord.Client();

        client.login(icModule.token).then(() => {
            let CanAddName: CanAdd[] = [
                { ref: client, name: "Client" }
            ];

            let providers: any[] = [];
            let commands: any[] = [];

            icModule.providers.forEach(provider => {
                let Parameters: string[] = getClassConstructorParameters(provider);
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

            let cmdNames: string[] = [];

            icModule.commands.forEach(command => {
                cmdNames.push(command.info.name);
            });

            CanAddName.push({ name: "Commands", ref: { all: cmdNames } });

            icModule.commands.forEach(command => {
                let Parameters: string[] = getClassConstructorParameters(command.comp);
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

            let Parameters: string[] = getClassConstructorParameters(target);
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
