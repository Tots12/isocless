"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
function IcImport(iicImport) {
    return (target) => {
        target.prototype.iicImport = iicImport;
        target.prototype.providersParams = [];
        target.prototype.imports = [];
        let CanAddName = [];
        if (iicImport.imports) {
            iicImport.imports.forEach(importClass => {
                let import_ = new importClass();
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
                    CanAddName.push({ ref: providerObj, name: provider.name });
                });
                import_["iicImport"].imports.forEach((import_) => {
                    target.prototype.imports.push(new import_());
                });
            });
        }
        if (iicImport.providers) {
            iicImport.providers.forEach(provider => {
                util_1.gccp(provider).forEach(parameter => {
                    let found = CanAddName.find(can => {
                        return can.name == parameter;
                    });
                    if (typeof found !== 'undefined') {
                        target.prototype.providersParams.push(found);
                    }
                });
            });
        }
    };
}
exports.IcImport = IcImport;
