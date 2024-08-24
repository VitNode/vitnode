import { getConfigFile } from '@/providers/config';
import { Injectable } from '@nestjs/common';

import { HelpersAdminEmailSettingsService } from '../../helpers.service';
import { ShowAdminEmailSettingsServiceObj } from './dto/show.obj';

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
