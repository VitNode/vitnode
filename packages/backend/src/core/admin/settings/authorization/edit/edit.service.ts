import { configPath, getConfigFile } from '@/providers';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { ShowAdminAuthorizationSettingsObj } from '../show/show.dto';
import { EditAdminAuthorizationSettingsArgs } from './edit.dto';

@Injectable()
export class EditAdminAuthorizationSettingsService {
  edit(
    args: EditAdminAuthorizationSettingsArgs,
  ): ShowAdminAuthorizationSettingsObj {
    const config = getConfigFile();
    config.settings.authorization = args;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    return {
      ...config.settings.authorization,
    };
  }
}
