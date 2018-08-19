import { IIcImport } from "../Interfaces/IIcImport";
import { CanAdd } from "../Interfaces";
import { Type, gccp } from "../util";

export function IcImport(iicImport: IIcImport) {
    return (target: Type<any>) => {
        target.prototype.iicImport = iicImport;
        target.prototype.providersParams = [];
        target.prototype.imports = [];

        let CanAddName: CanAdd[] = [];

        if (iicImport.imports) {
            iicImport.imports.forEach(importClass => {
                let import_ = new importClass();

                import_["iicImport"].providers.forEach((provider: Type<any>) => {
                    let Parameters: string[] = gccp(provider);
                    let addedParameters: any[] = [];
    
                    Parameters.forEach(parameter => {
                        let found = CanAddName.find(can => {
                            return can.name == parameter;
                        });
    
                        if (typeof found !== 'undefined') {
                            addedParameters.push(found.ref);
                        } else {
                            addedParameters.push(undefined);
                        }
                    });
    
                    let providerObj = new (Function.prototype.bind.apply(provider, [null].concat(addedParameters)))
    
                    CanAddName.push({ ref: providerObj, name: provider.name });
                });
    
                import_["iicImport"].imports.forEach((import_: Type<any>) => {
                    target.prototype.imports.push(new import_());
                });
            });
        }

        if (iicImport.providers) {
            iicImport.providers.forEach(provider => {
                gccp(provider).forEach(parameter => {
                    let found = CanAddName.find(can => {
                        return can.name == parameter;
                    });
    
                    if (typeof found !== 'undefined') {
                        target.prototype.providersParams.push(found);
                    }
                });
            });
        }
    }
}