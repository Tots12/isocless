import { IIcBot } from '../../Interfaces';
import { Commands } from '../../classes';
import { Client, Message } from 'discord.js';
export declare class CommandsManager {
    private commands;
    private icBot;
    private client;
    private config;
    constructor(commands: Commands, icBot: IIcBot, client: Client);
    configure(config?: {
        botUseCommands?: boolean;
    }): void;
    run(message: Message): void;
}
