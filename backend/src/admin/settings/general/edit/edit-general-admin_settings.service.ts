import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { GeneralAdminSettingsObj } from '../dto/general-admin_settings.obj';
import { EditGeneralAdminSettingsArgs } from './dto/edit-general-admin_settings.args';

import * as config from '@/config.json';

@Injectable()
export class EditGeneralAdminSettingsService {
  async edit(data: EditGeneralAdminSettingsArgs): Promise<GeneralAdminSettingsObj> {
    const newData = {
      ...config,
      ...data
    };

    fs.writeFile(join('config.json'), JSON.stringify(newData, null, 2), 'utf8', err => {
      if (err) throw err;
    });

    return data;
  }
}
