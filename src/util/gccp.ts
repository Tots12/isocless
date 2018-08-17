import 'reflect-metadata';

export function gccp(t: object): string[] {
    let params: string[] = Reflect.getMetadata('design:paramtypes', t);

    params.forEach((param, i) => {
        if (param.toString().includes("{") && param.toString().includes(" ")) {
            params[i] = param.toString()
                .split("{")[0]
                .split(" ")[1];
        }

        if (params[i].toString().includes("(") && params[i].toString().includes(")")) {
            params[i] = param.toString()
                .split("(")[0]
                .split("function ")[1];
        }
    });

    return params;
}