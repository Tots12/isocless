import * as Discord from 'discord.js';
import 'reflect-metadata';
import { Type } from './type';
export interface Command {
    info: {
        name: string;
    };
    comp: Type<any>;
}
export interface IcModule {
    commands: Command[];
    providers: Type<any>[];
    token: string;
    prefix: string;
    options: {
        useCommandsManager: boolean;
        botUseCommands: boolean;
    };
}
export declare class CommandsManager {
    private client;
    private commandsRef;
    private commandsNames;
    private icModule;
    constructor(client: Discord.Client, commandsRef: any[], commandsNames: string[], icModule: IcModule);
    run(message: Discord.Message): void;
}
export declare class Commands {
    all: string[];
    constructor(all: string[]);
}
export declare const IcModule: (icModule: IcModule) => (target: Type<object>) => void;
