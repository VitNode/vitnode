import { SendAdminEmailService } from '@/core/admin/email/send/send.service';
import { configPath, getConfigFile } from '@/providers';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { ShowAdminAuthorizationSettingsObj } from '../show/show.dto';
import { EditAdminAuthorizationSettingsArgs } from './edit.dto';

@Injectable()
export class EditAdminAuthorizationSettingsService {
  constructor(private readonly mailService: SendAdminEmailService) {}

  edit(
    args: EditAdminAuthorizationSettingsArgs,
  ): ShowAdminAuthorizationSettingsObj {
    const config = getConfigFile();
    config.settings.authorization = args;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    return {
      ...config.settings.authorization,
      is_email_enabled: this.mailService.checkIfEnable(),
    };
  }
}
