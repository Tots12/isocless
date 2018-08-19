"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("../../decorators");
const Interfaces_1 = require("../../Interfaces");
const classes_1 = require("../../classes");
const discord_js_1 = require("discord.js");
let CommandsManager = class CommandsManager {
    constructor(commands, icBot, client) {
        this.commands = commands;
        this.icBot = icBot;
        this.client = client;
        this.config = {
            botUseCommands: false
        };
    }
    configure(config) {
        this.config = config;
    }
    run(message) {
        if (this.config.botUseCommands == false)
            if (message.author.id === this.client.user.id)
                return;
        if (!message.content.includes(this.icBot.prefix))
            return;
        let args = message.content
            .substring(this.icBot.prefix.length)
            .split(" ");
        if (typeof this.commands.all == 'undefined' || this.commands.all.length < 1)
            return;
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
};
CommandsManager = __decorate([
    decorators_1.IcService(),
    __metadata("design:paramtypes", [classes_1.Commands,
        Interfaces_1.IIcBot,
        discord_js_1.Client])
], CommandsManager);
exports.CommandsManager = CommandsManager;
