# Isocless

One Framework for creating Discord Bots with TypeScript.

## Getting Started

npm install isocless

## Demo

### Tsconfig example

```JSON
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
}
```

### Code

```TypeScript
    import { IcModule, OnReady, OnMessage, CommandsManager, IcCommand } from 'isocless';
    import * as Discord from 'discord.js';

    @IcCommand()
    class PingCommand implements Run {
        constructor(
            private client: Discord.Client
        ) { }

        icRun(message: Discord.Message, args: string[]) {
            message.reply(`:ping_pong: Pong! ${Math.floor(this.client.ping)}`);
        }
    }

    @IcModule({
        commands: [{ info: { name: 'ping' }, comp: PingCommand }],
        providers: [],
        options: {
            useCommandsManager: true,
            botUseCommands: false
        },
        token: "Your bot token here",
        prefix: "!"
    })
    class BotModule implements OnReady, OnMessage {
        constructor(
            private commandsManager: CommandsManager,
            private client: Discord.Client
        ) { }

        icOnReady() {
            console.log("Bot's ready!");
        }

        icOnMessage(message: Message) {
            this.commandsManager.run(message);
        }
    }
```
