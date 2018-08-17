import { Type } from "../util";
export interface IIcModule {
    commands: Type<any>[];
    providers: Type<any>[];
    token: string;
    prefix: string;
    options: {
        useCommandsManager: boolean;
        botUseCommands: boolean;
    };
}
