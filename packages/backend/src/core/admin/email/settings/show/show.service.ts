import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

import { ShowAdminEmailSettingsServiceObj } from './dto/show.obj';

import { HelpersAdminEmailSettingsService } from '../../helpers.service';
import { getConfigFile } from '@/providers/config';

@Injectable()
export class ShowAdminEmailSettingsService extends HelpersAdminEmailSettingsService {
  show(): ShowAdminEmailSettingsServiceObj {
    if (!fs.existsSync(this.path)) {
      return {
        smtp_host: '',
        smtp_port: 0,
        smtp_secure: false,
        smtp_user: '',
        color_primary: 'hsl(220, 74%, 50%)',
      };
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
