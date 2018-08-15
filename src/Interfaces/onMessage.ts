import * as Discord from 'discord.js';

export interface OnMessage {
    icOnMessage(message: Discord.Message);
}