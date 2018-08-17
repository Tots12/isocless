"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function IcCommand(iicCommand) {
    return (target) => {
        target.prototype.info = iicCommand.info;
        target.prototype.isHelpCommand = iicCommand.isHelpCommand;
    };
}
exports.IcCommand = IcCommand;
