import { EmailProvider, getConfigFile } from '@/providers';
import { Injectable } from '@nestjs/common';

import { ShowAdminAuthorizationSettingsObj } from './show.dto';

@Injectable()
export class ShowAdminAuthorizationSettingsService {
  show(): ShowAdminAuthorizationSettingsObj {
    const config = getConfigFile();

    return {
      ...config.settings.authorization,
      is_email_enabled: config.settings.email.provider !== EmailProvider.none,
    };
  }
}
