"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandsManager {
    constructor(client, commandsRef, commandsNames, icModule) {
        this.client = client;
        this.commandsRef = commandsRef;
        this.commandsNames = commandsNames;
        this.icModule = icModule;
    }
    run(message) {
        if (this.icModule.options.botUseCommands == false && message.author.id === this.client.user.id)
            return;
        if (!message.content.includes(this.icModule.prefix))
            return;
        let args = message.content
            .substring(this.icModule.prefix.length)
            .split(" ");
        if (this.commandsNames.length < 1 || typeof this.commandsNames == 'undefined')
            return;
        this.commandsNames.forEach((command, i) => {
            if (args[0] === command) {
                this.commandsRef[i].icRun(message, args.splice(0, 1));
            }
        });
    }
}
exports.CommandsManager = CommandsManager;
