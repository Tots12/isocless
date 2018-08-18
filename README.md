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
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
}
```

### Code

#### Main Module
```TypeScript
import { IcBot, OnReady, OnMessage, CommandsManager } from 'isocless';
import * as Discord from 'discord.js';

@IcBot({
  commands: [PingCommand],
  providers: [],
  imports: [],
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
    
    // this.commandsManager.botUseCommands = true;
  }
 
  icOnMessage(message: Discord.Message) {
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
class PingCommand implements Run {
  constructor(
    private client: Discord.Client
  ) { }
 
  icRun(message: Discord.Message, args: string[]) {
    message.reply(`:ping_pong: Pong! ${Math.floor(this.client.ping)}`);
  }
}
```
