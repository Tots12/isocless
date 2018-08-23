import { IcImport } from '../../index';

import { HelpService } from './help.service';

@IcImport({
  providers: [HelpService],
  imports: []
})
export class HelpModule {
  constructor() { }
}