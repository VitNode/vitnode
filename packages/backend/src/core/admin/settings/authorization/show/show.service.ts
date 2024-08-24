import { getConfigFile } from '@/providers';
import { Injectable } from '@nestjs/common';

import { ShowAdminAuthorizationSettingsObj } from './dto/show.obj';

@Injectable()
export class ShowAdminAuthorizationSettingsService {
  show(): ShowAdminAuthorizationSettingsObj {
    const config = getConfigFile();

    return config.settings.authorization;
  }
}
