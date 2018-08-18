import { Type } from "../util";

export interface IIcBot {
    commands?: Type<any>[];
    providers?: Type<any>[];
    imports?: Type<any>[];
    token: string;
    prefix: string;
}
