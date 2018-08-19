import { IcImport } from '../../decorators/index';
import { CommandsManager } from './commands-manager.service';

@IcImport({
    imports: [],
    providers: [CommandsManager],
    onlyForBot: true
})
export class CommandsModule {
    constructor() { }
}