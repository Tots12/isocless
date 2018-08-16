import * as Discord from 'discord.js';

import { IIcModule } from '../Interfaces/IIcModule';

export class CommandsManager {
    constructor(
        private client: Discord.Client,
        private commandsRef: any[],
        private commandsNames: string[],
        private icModule: IIcModule
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