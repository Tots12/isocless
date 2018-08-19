import { Type } from "../util";

export class IIcBot {
    constructor(
        public token: string,
        public prefix: string,
        public commands?: Type<any>[],
        public imports?: Type<any>[],
        public providers?: Type<any>[]
    ) { }
}
