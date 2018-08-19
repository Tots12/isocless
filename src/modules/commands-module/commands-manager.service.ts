import { IcService } from '../../decorators';
import { IIcBot } from '../../Interfaces';
import { Commands } from '../../classes';

import { Client, Message } from 'discord.js';

@IcService()
export class CommandsManager {
    private config: { botUseCommands?: boolean } = {
        botUseCommands: false
    };

    constructor(
        private commands: Commands,
        private icBot: IIcBot,
        private client: Client
    ) { }

    configure(config?: { botUseCommands?: boolean }) {
        this.config = config;
    }

    run(message: Message) {
        if (this.config.botUseCommands == false) 
            if (message.author.id === this.client.user.id) return;

        if (!message.content.includes(this.icBot.prefix)) return;

        let args: string[] = message.content
            .substring(this.icBot.prefix.length)
            .split(" ");

        if (typeof this.commands.all == 'undefined' || this.commands.all.length < 1) return;

        this.commands.all.forEach((command, i) => {
            if (args[0] === command.name) {
                if (!command.ref["canUseInPrivate"] == true)
                    if (message.guild === null)
                        return;

                if (typeof command.ref.icRun !== 'undefined') 
                    command.ref.icRun(message, args.slice(1));
                else 
                    throw new Error(`No method for run the command "${command.name}"!`);
            }
        });
    }
}