import { Injectable } from '@nestjs/common';

import { HelpersCoreAi } from '../ai.helpers';
import { ShowAdminCoreAiObj } from './show.dto';

@Injectable()
export class ShowAdminCoreAiService extends HelpersCoreAi {
  show(): ShowAdminCoreAiObj {
    return this.getAiCredentials();
  }
}
