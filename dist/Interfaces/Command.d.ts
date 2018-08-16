import { Type } from '../util';
import { Info } from '.';
export interface Command {
    info: Info;
    comp: Type<any>;
}
