import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

import { ShowAdminEmailSettingsServiceObj } from '../show/dto/show.obj';
import { EditAdminEmailSettingsServiceArgs } from './dto/edit.args';

import { HelpersAdminEmailSettingsService } from '../../helpers.service';
import { ConfigType, configPath, getConfigFile } from '@/providers/config';

@Injectable()
export class EditAdminEmailSettingsService extends HelpersAdminEmailSettingsService {
  edit({
    smtp_host,
    smtp_password,
    smtp_port,
    smtp_secure,
    smtp_user,
    color_primary,
    color_primary_foreground,
  }: EditAdminEmailSettingsServiceArgs): ShowAdminEmailSettingsServiceObj {
    // Update settings
    const configSettings = getConfigFile();
    const newData: ConfigType = {
      ...configSettings,
      settings: {
        ...configSettings.settings,
        email: {
          color_primary,
          color_primary_foreground,
        },
      },
    };
    fs.writeFileSync(configPath, JSON.stringify(newData, null, 2), 'utf8');

    const smtpData = {
      smtp_host,
      smtp_password,
      smtp_port,
      smtp_secure,
      smtp_user,
    };

    fs.writeFileSync(this.path, JSON.stringify(smtpData, null, 2));

    return {
      ...smtpData,
      color_primary,
    };
  }
}
