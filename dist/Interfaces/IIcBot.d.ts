import { Type } from "../util";
export declare class IIcBot {
    token: string;
    prefix: string;
    commands?: Type<any>[];
    imports?: Type<any>[];
    providers?: Type<any>[];
    constructor(token: string, prefix: string, commands?: Type<any>[], imports?: Type<any>[], providers?: Type<any>[]);
}
