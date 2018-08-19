import { Type } from '../util/type';
import { IIcCommand } from '../Interfaces';

export function IcCommand(iicCommand: IIcCommand) {
    return (target: Type<object>) => {
        target.prototype.info = iicCommand.info;
        target.prototype.canUseInPrivate = iicCommand.canUseInPrivate;
    }
}