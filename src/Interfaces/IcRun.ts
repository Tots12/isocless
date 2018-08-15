import * as Discord from 'discord.js';

export interface Run {
    icRun(message: Discord.Message, args: string[]);
}