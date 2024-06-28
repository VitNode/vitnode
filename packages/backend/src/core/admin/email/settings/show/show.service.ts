import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

import { ShowAdminEmailSettingsServiceObj } from './dto/show.obj';

import { HelpersAdminEmailSettingsService } from '../../helpers.service';
import { getConfigFile } from '@/providers/config';

@Injectable()
export class ShowAdminEmailSettingsService extends HelpersAdminEmailSettingsService {
  show(): ShowAdminEmailSettingsServiceObj {
    if (!fs.existsSync(this.path)) {
      const smtpData = {
        smtp_host: '',
        smtp_password: '',
        smtp_port: 0,
        smtp_secure: false,
        smtp_user: '',
      };

      fs.writeFileSync(this.path, JSON.stringify(smtpData, null, 2));
    }

    const {
      settings: { email: emailSettings },
    } = getConfigFile();

    const read = fs.readFileSync(this.path, 'utf-8');
    const config: ShowAdminEmailSettingsServiceObj = JSON.parse(read);

    return {
      ...config,
      ...emailSettings,
    };
  }
}
