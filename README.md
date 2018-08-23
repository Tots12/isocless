# Isocless
One Framework for creating Discord Bots with TypeScript.

## Demo

### Tsconfig example

```JSON
{
  "compilerOptions": {
    "module": "commonjs",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
}
```

### Code

#### Main Module
```TypeScript
import { OnReady, OnMessage, IcBot, CommandsModule, CommandsManager } from 'isocless';

import { Message } from 'discord.js';

import { PingCommand } from './ping.command';
import { HelpCommand } from './help.command';

@IcBot({
    commands: [
      PingCommand, 
      HelpCommand
    ],
    providers: [],
    imports: [
      CommandsModule, 
      HelpModule
    ],
    prefix: '#',
    token: 'Your bot token here!'
})
export class Bot implements OnReady, OnMessage {
    constructor(
        private commandsManager: CommandsManager
    ) { }

    icOnReady() {
        console.log("Bot's ready!");
    }

    icOnMessage(message: Message) {
        this.commandsManager.run(message);
    }
}
```

#### Ping Command
```TypeScript
import { IcCommand, Run } from 'isocless';
import * as Discord from 'discord.js';

@IcCommand({
  info: {
    name: 'ping',
    description: 'Show the ping of the bot client'
  }
})
export class PingCommand implements Run {
  constructor(
    private client: Discord.Client
  ) { }
 
  icRun(message: Discord.Message, args: string[]) {
    message.reply(`:ping_pong: Pong! ${Math.floor(this.client.ping)}`);
  }
}
```

```TypeScript
import { IcCommand, Run, HelpService } from 'isocless';
import * as Discord from 'discord.js';

@IcCommand({
  info: {
    name: 'ping',
    description: 'Show the ping of the bot client'
  },
  canUseInPrivate: true
})
export class HelpCommand implements Run {
  construcotr(
    private help: HelpService
  ) { }
  
  icRun(message: Discord.Message, args: string[]) {
    this.help.helpEmbed(message, 0x9a5be6);
  }
}
```
