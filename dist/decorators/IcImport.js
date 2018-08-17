"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
function IcImport(iicImport) {
    return (target) => {
        target.prototype.iicImport = iicImport;
        target.prototype.providers = [];
        target.prototype.imports = [];
        let CanAddName = [];
        iicImport.imports.forEach(import_ => {
            import_["iicImport"].providers.forEach((provider) => {
                let Parameters = util_1.gccp(provider);
                let addedParameters = [];
                Parameters.forEach(parameter => {
                    let found = CanAddName.find(can => {
                        return can.name == parameter;
                    });
                    if (typeof found !== 'undefined') {
                        addedParameters.push(found.ref);
                    }
                    else {
                        addedParameters.push(undefined);
                    }
                });
                let providerObj = new (Function.prototype.bind.apply(provider, [null].concat(addedParameters)));
                target.prototype.providers.push(providerObj);
                CanAddName.push({ ref: providerObj, name: provider.name });
            });
            import_["iicImport"].imports.forEach((import_) => {
                target.prototype.imports.push(new import_());
            });
        });
        iicImport.providers.forEach(provider => {
            let Parameters = util_1.gccp(provider);
            let addedParameters = [];
            Parameters.forEach(parameter => {
                let found = CanAddName.find(can => {
                    return can.name == parameter;
                });
                if (typeof found !== 'undefined') {
                    addedParameters.push(found.ref);
                }
                else {
                    addedParameters.push(undefined);
                }
            });
            let providerObj = new (Function.prototype.bind.apply(provider, [null].concat(addedParameters)));
            target.prototype.providers.push(providerObj);
            CanAddName.push({ ref: providerObj, name: provider.name });
        });
    };
}
exports.IcImport = IcImport;
