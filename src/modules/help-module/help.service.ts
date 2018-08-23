import { IcService, Commands, IIcBot } from '../../index';

import { Message, RichEmbed } from 'discord.js';

@IcService()
export class HelpService {
  constructor(
    private commands: Commands,
    private iicBot: IIcBot
  ) { }

  helpEmbed(message: Message, embedColor?: number, inline?: boolean) {
    let fields: { name: string; value: string; inline?: boolean; }[] = [];

    this.commands.all.forEach(command => {
      fields.push({
        name: `${this.iicBot.prefix}${command.name}`,
        value: `${command.description}`,
        inline: typeof inline !== 'undefined' ? inline : undefined
      });
    });

    message.channel.send({
      embed: new RichEmbed({
        color: typeof embedColor !== 'undefined' ? embedColor : 0,
        fields: fields
      })
    });
  }
}