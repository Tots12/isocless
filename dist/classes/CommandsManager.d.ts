import * as Discord from 'discord.js';
import { IIcBot } from '../Interfaces/IIcBot';
export declare class CommandsManager {
    private client;
    private commandsRef;
    private commandsNames;
    private icModule;
    botUseCommands: boolean;
    constructor(client: Discord.Client, commandsRef: any[], commandsNames: string[], icModule: IIcBot);
    run(message: Discord.Message): void;
}
