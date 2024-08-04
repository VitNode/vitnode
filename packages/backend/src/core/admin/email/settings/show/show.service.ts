import { Injectable } from '@nestjs/common';

import { ShowAdminEmailSettingsServiceObj } from './dto/show.obj';

import { HelpersAdminEmailSettingsService } from '../../helpers.service';
import { getConfigFile } from '@/providers/config';

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
