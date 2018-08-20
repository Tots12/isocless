import 'reflect-metadata';

export function gccp(t: object): string[] {
    let params: string[] = Reflect.getMetadata('design:paramtypes', t);

    if (params) {
        params.forEach((param, i) => {
            if (param) {
                if (param.toString().includes("{") && param.toString().includes(" ")) {
                    params[i] = param.toString()
                        .split("{")[0]
                        .split(" ")[1];
                }
                
                if (params[i].toString().includes("(") && params[i].toString().includes(")")) {
                    params[i] = param.toString()
                        .split("(")[0]
                        .split("function ")[1];
                } else if (params[i].toString().includes("(")) {
                    params[i] = param.toString()
                        .split("(")[0];
                }
            }
        });
    } else {
        throw new Error("You need to use the decorators in all the providers, and in all the commands to work!");
    }

    return params;
}