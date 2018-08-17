import { IIcImport } from "../Interfaces/IIcImport";
import { CanAdd } from "../Interfaces";
import { Type, gccp } from "../util";

export function IcImport(iicImport: IIcImport) {
    return (target: Type<any>) => {
        target.prototype.iicImport = iicImport;
        target.prototype.providers = [];
        target.prototype.imports = [];

        let CanAddName: CanAdd[] = [];

        iicImport.imports.forEach(import_ => {
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

                target.prototype.providers.push(providerObj);
                CanAddName.push({ ref: providerObj, name: provider.name });
            });

            import_["iicImport"].imports.forEach((import_: Type<any>) => {
                target.prototype.imports.push(new import_());
            });
        });

        iicImport.providers.forEach(provider => {
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

            target.prototype.providers.push(providerObj);
            CanAddName.push({ ref: providerObj, name: provider.name });
        });
    }
}