"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function gccp(t) {
    let params = Reflect.getMetadata('design:paramtypes', t);
    if (typeof params != 'undefined') {
        params.forEach((param, i) => {
            if (param.toString().includes("{") && param.toString().includes(" ")) {
                params[i] = param.toString()
                    .split("{")[0]
                    .split(" ")[1];
            }
            if (params[i].toString().includes("(") && params[i].toString().includes(")")) {
                params[i] = params[i].toString()
                    .split("(")[0]
                    .split("function ")[1];
            }
            else if (param.toString().includes("(")) {
                params[i] = params[i].toString()
                    .split("(")[0];
            }
            if (params[i].toString().includes("!")) {
                params[i] = params[i].toString()
                    .split("!")[0];
            }
        });
    }
    else {
        throw new Error("You need to use the decorators in all the providers, and in all the commands to work!");
    }
    return params;
}
exports.gccp = gccp;
