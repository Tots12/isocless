import { Commands, IIcBot } from '../../index';
import { Message } from 'discord.js';
export declare class HelpService {
    private commands;
    private iicBot;
    constructor(commands: Commands, iicBot: IIcBot);
    helpEmbed(message: Message, embedColor?: number, inline?: boolean): void;
}
