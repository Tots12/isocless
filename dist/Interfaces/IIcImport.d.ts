import { Type } from "../util";
export interface IIcImport {
    imports?: Type<any>[];
    providers?: Type<any>[];
    onlyForBot?: boolean;
}
