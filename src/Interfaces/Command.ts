import { Type } from '../util';

export interface Command {
    info: { name: string; };
    comp: Type<any>;
}