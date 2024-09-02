import { getConfigFile } from '@/providers/config';
import { Injectable } from '@nestjs/common';

import { HelpersAdminEmailSettingsService } from '../../helpers.service';
import { ShowAdminEmailSettingsServiceObj } from './show.dto';

@Injectable()
export class ShowAdminEmailSettingsService extends HelpersAdminEmailSettingsService {
  show(): ShowAdminEmailSettingsServiceObj {
    const {
      settings: { email: emailSettings },
    } = getConfigFile();
    const config = this.getEmailCredentials();

    return {
      ...config,
      ...emailSettings,
    };
  }
}
