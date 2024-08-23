import { Injectable } from '@nestjs/common';

import { ShowAdminAuthorizationSettingsObj } from './dto/show.obj';

import { getConfigFile } from '@/providers';

@Injectable()
export class ShowAdminAuthorizationSettingsService {
  show(): ShowAdminAuthorizationSettingsObj {
    const config = getConfigFile();

    return config.settings.authorization;
  }
}
