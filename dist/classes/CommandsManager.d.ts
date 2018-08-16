import * as Discord from 'discord.js';
import { IIcModule } from '../Interfaces/IIcModule';
export declare class CommandsManager {
    private client;
    private commandsRef;
    private commandsNames;
    private icModule;
    constructor(client: Discord.Client, commandsRef: any[], commandsNames: string[], icModule: IIcModule);
    run(message: Discord.Message): void;
}
