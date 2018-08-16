import { Command } from "./Command";
import { Type } from "../util";
export interface IIcModule {
    commands: Command[];
    providers: Type<any>[];
    token: string;
    prefix: string;
    options: {
        useCommandsManager: boolean;
        botUseCommands: boolean;
    };
}
