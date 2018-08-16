"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
function gccp(t) {
    let params = Reflect.getMetadata('design:paramtypes', t);
    params.forEach((param, i) => {
        params[i] = param.toString()
            .split("{")[0]
            .split(" ")[1];
        if (params[i].includes("(") && params[i].includes(")")) {
            params[i] = param.toString()
                .split("(")[0]
                .split("function ")[1];
        }
    });
    return params;
}
exports.gccp = gccp;
