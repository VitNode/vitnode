import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

import { EditAdminAuthorizationSettingsArgs } from './dto/edit.args';
import { ShowAdminAuthorizationSettingsObj } from '../show/dto/show.obj';

import { configPath, getConfigFile } from '@/providers';

@Injectable()
export class EditAdminAuthorizationSettingsService {
  edit(
    args: EditAdminAuthorizationSettingsArgs,
  ): ShowAdminAuthorizationSettingsObj {
    const config = getConfigFile();
    config.settings.authorization = args;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

    return config.settings.authorization;
  }
}
